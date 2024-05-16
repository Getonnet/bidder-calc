console.log("Scripts LOADER ______ LOCALHOST: 2.0");

const CHECKBOX_LABELS = {
  "subscription-important_features": "What is most important to you in a mobile subscription?",
  subscription_size: "Size-of-the-subscription",
};
const SUBSCRIBER_TYPE = {
  "Only for me": "individual",
  "For several/Family": "family",
};
const SUBSCRIBER_TYPE_KEY = "Subscription-are-for";
const NO_LABEL_FOUND = "__NO__LABEL__FOUND__";
const LEAD_FORM_SUBMIT_BUTTON_ID = "submit-first-form-btn";
const FIRST_NAME = "First-name";
const LAST_NAME = "Last-name";
const EMAIL = "Email";
const PHONE_NUMBER = "Phone-number";
const OPERATOR_PRICES = "operatorPrices";
const IGNORED_KEYS_ON_RESET = [FIRST_NAME, LAST_NAME, EMAIL, PHONE_NUMBER, OPERATOR_PRICES, "subscription-important_features"];
const SEND_OFFERS_TO_MY_EMAIL = "Send offers to my email";
const CONTACT_BY_AN_ADVISER = "Contact by an adviser";
const LOADING_TEXT = "Laster inn ...";
const HAS_ACTIVE_SUBSCRIPTION_FIELD_NAME = "Do-you-have-any-current-subscription";
const CURRENT_OPERATOR_FIELD_NAME = "current-operator";
const OPERATOR_PRICES_WITH_PREFERENCES_POINTS = "OPERATOR_PRICES_WITH_PREFERENCES_POINTS";
const FILTER_VALUES = {
  PRICE: "price",
  PREFERENCES: "preferences",
};

const sv = (key, val) => sessionStorage.setItem(key, val);
const gv = (key) => sessionStorage.getItem(key);
const rmv = (key) => sessionStorage.removeItem(key);
const resetDb = () => {
  // remove all session storage values, except for names, email, phone
  Object.keys(sessionStorage).map((key) => {
    if (IGNORED_KEYS_ON_RESET.includes(key)) return;
    rmv(key);
  });
};

function flattenAndFindMax(arr) {
  // Flatten the array
  const flatArray = arr.flat(Infinity);
  // Find the highest number
  return Math.max(...flatArray);
}

const getSubscriberType = () => {
  const type = gv(SUBSCRIBER_TYPE_KEY);
  return {
    subscriberType: type,
    isIndividual: type === Object.keys(SUBSCRIBER_TYPE)[0],
    isFamily: type === Object.keys(SUBSCRIBER_TYPE)[1],
  };
};

const formatNumber = (num) => {
  // Convert the number to a string
  let numStr = num.toString();

  // Check if the length is less than 2
  if (numStr.length < 2) {
    // Prepend '0' to the string
    numStr = "0" + numStr;
  }

  return numStr;
};

const getFormattedSizes = (sizes) => {
  let result = {};

  if (!Array.isArray(sizes)) {
    sizes = [sizes];
  }

  sizes.forEach((item) => {
    let [key, value] = item.split(":");
    let [start, end] = value.split("-").map(Number);
    let valAvg = Math.ceil((start + end) / 2);

    if (!result[key]) {
      result[key] = [valAvg];
    } else {
      result[key] = [...result[key], valAvg];
    }
  });

  return result;
};

const getTotalFromSizes = (prices, sizes) => {
  let total = 0;
  const biggestSize = flattenAndFindMax(Object.values(sizes));
  let link = "";

  Object.keys(sizes).map((key) => {
    sizes[key].map((item) => {
      let price = prices.find((x) => x.split("=")[0] === item.toString());
      total += parseInt(price ? price.split("=")[1] : 0);
      // get link for biggest size, each size can have different links
      if (item.toString() === biggestSize.toString()) link = price.split(",")[1];
    });
  });

  // average for all selected sizes
  return [Math.floor(total / Object.keys(sizes).length), link];
};

const getType = (val) => {
  try {
    const parsedValue = JSON.parse(val);
    if (Array.isArray(parsedValue)) return "array";
    return "object";
  } catch (e) {
    return typeof val;
  }
};

const getOldValuesAndUpdateUI = () => {
  const values = sessionStorage;
  Object.keys(values).map((key) => {
    // update checkboxes
    if (Object.values(CHECKBOX_LABELS).includes(key)) {
      const arr = getType(values[key]) === "array" ? JSON.parse(values[key]) : [values[key]];

      arr.map((val, i) => {
        let $input = $(`input[data-name='${val}']`);
        if ($input.attr("type") === "checkbox") {
          $input.prop("checked", true);
          $input.siblings(".checkbox_circle").addClass("w--redirected-checked");
        }

        if (key === CHECKBOX_LABELS.subscription_size) {
          $input = $(`[individual-sizes]:nth-child(${i + 1}) input[value='${val}']`);
        } else {
          $input = $(`input[value='${val}']`);
        }
        if ($input.attr("type") === "radio") {
          $input.prop("checked", true);
          $input.closest("label").addClass("is-active");
          $input.siblings(".radio_circle").addClass("w--redirected-checked");
        }
      });
    } else {
      let $input = $(`input[value='${values[key]}']`);
      // update radio buttons
      if ($input.attr("type") === "radio") {
        $input.prop("checked", true);
        $input.closest("label").addClass("is-active");
        $input.siblings(".radio_circle").addClass("w--redirected-checked");
        // special case for current operator selector: step 1
        if ($input.attr("data-name") === "current operator") {
          $input.closest("label").addClass("is-active");
          $input.siblings(".subscription_radio").addClass("w--redirected-checked");
        }
      } else {
        // update text inputs
        $input = $(`input[name='${key}']`);
        $input.val(values[key]);
      }
    }
  });
};

const show_filtered_and_sorted_operators = (operatorPrices) => {
  let addedBestValue = false;

  // reset rating icon fill to #D9D9D8
  $(".rating_icon svg path").attr("fill", "#D9D9D8");

  operatorPrices.forEach((item, i) => {
    const $offer_card = $(`#${item.operatorName.toLowerCase()}`);

    if (!item.currentOperator && !addedBestValue) {
      // update best value badge
      $(".best_value-banner").appendTo($offer_card);
      addedBestValue = true;
    }

    // fix css order
    $offer_card.css({ order: i + 1, display: item.currentOperator ? "none" : "flex" });

    // update price and links and rating
    $offer_card.find(".price_text-total").text(item.total + " nok");
    $offer_card.find(".continue_button").attr("href", item.link);
    $offer_card.find(".average-price_text").text(Math.round(item.total) + " nok per måned");

    // update rating number
    const rating = 5 - i < 2 ? 2 : 5 - i;
    $offer_card.find(".rating_text").text(rating + "/5");
    // add color to rating dots
    if (rating >= 5) {
      $offer_card.find(".rating_icon svg path:lt(5)").attr("fill", "#F8B200");
    } else if (rating >= 4) {
      $offer_card.find(".rating_icon svg path:lt(4)").attr("fill", "#F8B200");
    } else if (rating >= 3) {
      $offer_card.find(".rating_icon svg path:lt(3)").attr("fill", "#7AC143");
    } else {
      $offer_card.find(".rating_icon svg path:lt(2)").attr("fill", "#A5BD9D");
    }
  });
};

const merge_preferences_points_with_operator_prices = (operatorPrices, preferences) => {
  // 3, 0, 0, 0, 5, 5;
  // 1:"A Lot Of Data For The Money"2:"Good Coverage"3:"I Want To Be Able To Share Data With My Family"4:"I Don T Want A Lock In Period"5:"Good Customer Service"6:"Other"
  let preferencesPoints = {};
  $(".preferences-points").each(function (index, el) {
    const $el = $(el);
    const points = $el.text();
    const name = $el.attr("name").toLowerCase();
    preferencesPoints[name] = points;
  });

  const formattedPreferencesPoints = {};
  Object.keys(preferencesPoints).map((k) => {
    const pointsArr = preferencesPoints[k].split(",");
    if (pointsArr.length < 6) throw new Error("Invalid preferences points length, expected 6");
    formattedPreferencesPoints[k] = {
      "A Lot Of Data For The Money": Number(pointsArr[0]),
      "Good Coverage": Number(pointsArr[1]),
      "I Want To Be Able To Share Data With My Family": Number(pointsArr[2]),
      "I Don T Want A Lock In Period": Number(pointsArr[3]),
      "Good Customer Service": Number(pointsArr[4]),
      Other: Number(pointsArr[5]),
    };
  });
  // console.log(operatorPrices);
  // console.log(preferences);
  // console.log(formattedPreferencesPoints);

  const operatorPricesWithPreferencesPoints = operatorPrices
    .map((operator) => {
      const currentOperatorPoints = formattedPreferencesPoints[operator.operatorName.toLowerCase()];
      const totalPoints = preferences.map((p) => currentOperatorPoints[p]).reduce((acc, curr) => acc + curr, 0);
      return { ...operator, totalPoints };
    })
    .sort((a, b) => b.totalPoints - a.totalPoints);

  // console.log(operatorPricesWithPreferencesPoints);
  // save to storage
  sv(OPERATOR_PRICES_WITH_PREFERENCES_POINTS, JSON.stringify(operatorPricesWithPreferencesPoints));
};

$(function () {
  let $body = $("body");
  let currentStep = 1;
  const step1OptionalFields = $("[step-1-optional-field]");
  const optionalInputs = $(".optional-field input");

  // if first page, reset session storage, hide operator selection until prev question is answered
  if ($body.hasClass("body-calc-step1")) {
    currentStep = 1;
    // hide optional fields conditionally
    if (gv(HAS_ACTIVE_SUBSCRIPTION_FIELD_NAME) === "No" || !gv(HAS_ACTIVE_SUBSCRIPTION_FIELD_NAME)) {
      step1OptionalFields.hide();
      optionalInputs.removeAttr("required");
    }

    // check for session storage values and update ui
    getOldValuesAndUpdateUI();
  }

  // if second page
  // depending on subscriber type, show/hide generate sizes button
  if ($body.hasClass("body-calc-step2")) {
    currentStep = 2;
    const { isIndividual } = getSubscriberType();
    const currentSizes = gv(CHECKBOX_LABELS.subscription_size);
    const currentSizesIsArray = getType(currentSizes) === "array";

    if (isIndividual) {
      $("#more-sizes").addClass("hidden");
      $("[individual-sizes]").removeClass("hidden");
    } else {
      $("#more-sizes").removeClass("hidden");
      $("[individual-sizes]").removeClass("hidden");
      // $("[individual-sizes]").detach();
      // $("[data-default]").removeClass("hidden");

      /**
       * Step 2 dynamic functions
       * attach event handlers
       */
      const sizeFieldsWrap = $(".size-fields-wrapper");
      const defaultSizeField = $(".form-field-container[individual-sizes]");
      let cloneCount = 1;

      /**
       * -------------------------------------------------------------
       * sizes field add or remove
       */
      // handle add new size field
      $(".add-more-size_btn").on("click", function () {
        // clone element
        const $clone = defaultSizeField.clone();

        $clone.addClass("border-top");
        $clone.find(".delete-size").first().removeClass("is-default");
        const serialNum = $clone.find(".calculator-sub-title_num").first();
        serialNum.text(formatNumber(cloneCount + 1));
        cloneCount += 1;

        // clear input values
        $clone.find("input").prop("checked", false);
        $clone.find(".w-radio-input").removeClass("w--redirected-checked");
        $clone.find(".w-radio-input").parent().removeClass("is-active");

        // update attributes of input fields
        const inputFields = $clone.find("input");
        inputFields.each(function (index, el) {
          // name, id, for
          const name = $(el).attr("name");
          const newName = name + cloneCount;
          const value = $(el).val();
          // const newValue = value.replace(value.split(":")[0], cloneCount);

          $(el).attr("name", newName);
          $(el).attr("id", newName);
          $(el).val(value);
          $(el).siblings(".w-form-label").attr("for", newName);
          const dataName = $(el).attr("data-name");
          $(el).attr("data-name", dataName + cloneCount);
        });

        hideErrorMessages(inputFields.first());

        // append to parent
        sizeFieldsWrap.append($clone);
      });

      // handle delete size field
      sizeFieldsWrap.on("click", ".delete-size", function () {
        // cleanup session storage
        const $el = $(this);
        const parentEl = $el.closest("[individual-sizes]");
        const parentElPosition = parentEl.index();
        // const $inputs = $el.closest(".details_title-wrap").siblings(".form-block").find("input");
        const label = CHECKBOX_LABELS.subscription_size;
        const oldValues = JSON.parse(gv(label)); // this is always and array, since delete button only available for multiple sizes
        const newValues = oldValues.filter((_, i) => i !== parentElPosition);
        saveInputValue(label, JSON.stringify(newValues));
        // remove element
        $(this).closest(".form-field-container").remove();
        // update serial numbers
        const serialNums = sizeFieldsWrap.find(".calculator-sub-title_num");
        serialNums.each(function (index, el) {
          $(el).text(formatNumber(index + 1));
        });
      });
      // ========================================== END STEP 2

      /**
       * generate missing rows
       * (applicable for family only & when values are present in session storage)
       */
      // extract everything before : and get unique values
      const selectedSizes = currentSizesIsArray ? JSON.parse(currentSizes) : [currentSizes];
      // for each unique value, create a new row by duplicating the default row
      selectedSizes.forEach((_, i) => {
        if (i === 0) return;
        $(".add-more-size_btn").trigger("click");
      });
    }

    // check for session storage values and update ui
    getOldValuesAndUpdateUI();
  }

  // if third page
  if ($body.hasClass("body-calc-step3")) {
    currentStep = 3;
    // check for session storage values and update ui
    getOldValuesAndUpdateUI();
  }

  // if last page, show offers and filter buttons
  if ($body.hasClass("body-calc-step4")) {
    currentStep = 4;
    const operatorPrices = JSON.parse(gv("operatorPrices"));
    const preferences = JSON.parse(gv(CHECKBOX_LABELS["subscription-important_features"])).filter(Boolean); // the filter is to remove falsy values

    // prepare preferences points filter and data
    merge_preferences_points_with_operator_prices(operatorPrices, preferences);

    // on page load, update order and rating
    if (operatorPrices) {
      show_filtered_and_sorted_operators(operatorPrices);
    }

    // show hide services
    const $buttonServices = $(".button-services");
    $buttonServices.on("click", function () {
      const $el = $(this);
      const $services = $el.closest(".offer_card").find(".operator-details").first();
      $services.slideToggle(250);
    });
  }

  function showErrorMessages($formChild) {
    $formChild.closest("form").siblings(".form-error-message").css({ display: "block" });
  }

  function hideErrorMessages($formChild) {
    $formChild.removeClass("is-error");
    $formChild.closest("form").siblings(".form-error-message").css({ display: "none" });
  }

  /**
   * -------------------------------------------------------------
   * Required field validation
   * on ".continue_button" link click, check if all required fields are filled
   * if not, then show error message, else continue to next page load
   */
  $(".continue_button").on("click", function (e) {
    e.preventDefault();
    let errors = false;
    const $el = $(this);
    const link = $el.attr("href");
    const { isFamily, isIndividual } = getSubscriberType();

    const uniqueInputs = $("input")
      .map(function () {
        return this.name;
      })
      .get();

    // Filter only the required inputs
    const requiredInputs = uniqueInputs.filter(function (name) {
      return $("[name='" + name + "'][required]").length > 0;
    });

    // unique values
    const uniqueRequiredInputs = [...new Set(requiredInputs)];

    uniqueRequiredInputs.forEach((name) => {
      const $input = $(`input[name='${name}']`);
      const $inputType = $input.attr("type");

      if ($inputType === "radio" && !$(`input[name='${name}']:checked`).val()) {
        errors = true;
        showErrorMessages($input);
      } else if ($inputType === "checkbox" && !$(`input[name='${name}']:checked`).val()) {
        errors = true;
        showErrorMessages($input);
      } else if (!$input.val()) {
        errors = true;
        showErrorMessages($input);
      } else if ($inputType === "tel" && $input.val().length < 8) {
        errors = true;
        showErrorMessages($input);
      }
    });

    // --------------------------------- for repeater size fields
    if (currentStep === 2) {
      const $sizeFieldsWrap = $(".size-fields-wrapper");
      if ($sizeFieldsWrap.length && isFamily) {
        // if at least one radio is not selected under each row
        // then show error message
        const $sizeFields = $sizeFieldsWrap.find(".form-field-container");
        $sizeFields.each(function (index, el) {
          const $inputs = $(el).find("input");
          const $checkboxes = $inputs.filter((index, el) => $(el).attr("type") === "radio");
          const $checked = $checkboxes.filter((index, el) => $(el).is(":checked"));
          if (!$checked.length) {
            errors = true;
            showErrorMessages($inputs.first());
          }
        });
      }
      if ($sizeFieldsWrap.length && isIndividual) {
        // if at least one radio button is not checked under the form
        // then show error message
        const $sizeFieldInputs = $sizeFieldsWrap.find("input[type='radio']");
        if (!$sizeFieldInputs.filter(":checked").length) {
          errors = true;
          showErrorMessages($sizeFieldInputs.first());
        }
      }
    }

    if (errors) return;

    // --------------------------------- for lead form submission
    if ($el.attr("id") === LEAD_FORM_SUBMIT_BUTTON_ID) {
      // --------------------------------- calculate price offer for each operator
      const operatorPrices = [];

      const userType = gv(SUBSCRIBER_TYPE_KEY);
      const rawPricesPerOperator = $(`[data-type='${SUBSCRIBER_TYPE[userType]}']`);
      const sizes = getFormattedSizes(JSON.parse(gv(CHECKBOX_LABELS.subscription_size)));

      rawPricesPerOperator.each(function (index, el) {
        const $el = $(el);
        const operatorName = $el.attr("id");
        // if name matches current-operator, skip
        const prices = $el.text().split("\n");
        const [total, link] = getTotalFromSizes(prices, sizes);
        operatorPrices.push({
          operatorName,
          total,
          link,
          currentOperator: gv(CURRENT_OPERATOR_FIELD_NAME)?.toLowerCase() === operatorName.toLowerCase(),
        });
      });

      // sort by price
      operatorPrices.sort((a, b) => a.total - b.total);
      // save to session storage
      sv("operatorPrices", JSON.stringify(operatorPrices));
      // submit lead form
      submitLeadForm();

      // navigate to next page
      setTimeout(() => {
        window.location.href = link;
      }, 3000);
    } else window.location.href = link;
  });
  // ========================================== END Continue button click

  function saveInputValue(name, val) {
    sv(name, val);
  }

  function handleRadioButtonClick(e) {
    e.preventDefault();
    const $el = $(e.currentTarget);
    // ui state updates
    $el.addClass("is-active");
    $el.find('input[type="radio"]').prop("checked", true);
    $el.find(".w-radio-input").addClass("w--redirected-checked");
    $el.siblings().removeClass("is-active");
    $el.siblings().find(".w-radio-input").removeClass("w--redirected-checked");

    const $input = $el.find("input");
    const $name = $input.attr("name");

    // save value to session storage
    if ($el.closest("form").hasClass("subscription_size")) {
      // step2: subscription sizes, save values in one array
      // get parent position
      const parentEl = $el.closest("[individual-sizes]");
      const parentElPosition = parentEl.index();
      // get existing values
      const oldValues = gv(CHECKBOX_LABELS.subscription_size);
      let parsedOldValues = getType(oldValues) === "array" ? JSON.parse(oldValues) : [oldValues];
      // update value at parent position
      parsedOldValues[parentElPosition] = $input.val();
      // const uniqueValues = [...new Set(parsedOldValues)];
      saveInputValue(CHECKBOX_LABELS.subscription_size, JSON.stringify(parsedOldValues));
    } else {
      saveInputValue($name, $input.val());
    }

    hideErrorMessages($el);

    console.log("--------------");

    // step 1: show/hide optional fields
    if ($name === HAS_ACTIVE_SUBSCRIPTION_FIELD_NAME) {
      const isChecked = $(`[name=${HAS_ACTIVE_SUBSCRIPTION_FIELD_NAME}]`).prop("checked");
      if (isChecked) {
        optionalInputs.attr("required", "true");
        step1OptionalFields.slideDown();
      } else {
        optionalInputs.removeAttr("required");
        step1OptionalFields.slideUp();
        rmv(CURRENT_OPERATOR_FIELD_NAME);
      }
    }
  }

  // radio button field on click
  $(".service-form").on("click", ".radio_button, .radio_button-sm", handleRadioButtonClick);

  // checkbox field on click
  const handleCheckboxSelection = (e) => {
    const $el = $(e.currentTarget);
    const $parent = $el.parent();
    if ($parent.hasClass("filter-form")) return;
    const $input = $el.find("input[type='checkbox']");
    // get key from parent based on CHECKBOX_LABELS
    let label = NO_LABEL_FOUND;

    Object.keys(CHECKBOX_LABELS).map((key) => {
      if ($parent.hasClass(key)) {
        label = CHECKBOX_LABELS[key];
      }
    });

    const currentVal = gv(label);
    const oldValues = getType(currentVal) === "array" ? JSON.parse(currentVal) : [currentVal];
    console.log(oldValues);

    if ($input.is(":checked")) {
      hideErrorMessages($input);
      // save value to session storage
      if (!oldValues) {
        saveInputValue(label, JSON.stringify([$input.attr("data-name")]));
      } else {
        saveInputValue(label, JSON.stringify([...oldValues, $input.attr("data-name")]));
      }
    } else {
      // remove value from session storage
      const newValues = oldValues && oldValues.filter((val) => val !== $input.attr("data-name"));
      saveInputValue(label, JSON.stringify(newValues));
    }
  };
  $(".service-form").on("click", ".checkbox_button, .checkbox_accpetance", handleCheckboxSelection);

  // filter checkbox: this works like radio button
  $(".filter-form").on("click", ".checkbox_button", function (e) {
    e.preventDefault();
    const $el = $(this);
    const $input = $el.find("input[type='checkbox']");
    const $label = $el.find(".checkbox_circle");
    const name = $input.attr("name");

    if ($input.is(":checked")) {
    } else {
      $input.prop("checked", true);
      $label.addClass("w--redirected-checked");

      // handle siblings
      const $siblings = $el.siblings();
      $siblings.find("input[type='checkbox']").prop("checked", false);
      $siblings.find(".checkbox_circle").removeClass("w--redirected-checked");

      if (name === FILTER_VALUES.PRICE) {
        show_filtered_and_sorted_operators(JSON.parse(gv(OPERATOR_PRICES)));
      } else {
        show_filtered_and_sorted_operators(JSON.parse(gv(OPERATOR_PRICES_WITH_PREFERENCES_POINTS)));
      }
    }
  });

  // text inputs: Step 3
  $(".service-form input").on("input", function () {
    const inputType = $(this).attr("type");
    if (inputType === "checkbox") return;
    if (inputType === "radio") return;

    // auto format values
    if (inputType === "number") {
      // allow only numbers
      let val = $(this).val();
      val = val.replaceAll("+", "");
      val = val.replaceAll("-", "");
      $(this).val(val);
    }

    // auto format values
    if (inputType === "tel") {
      // phone validation, allow + on first position, allow numbers only, remove all other characters
      let val = $(this).val();
      if (val[0] === "+") {
        val =
          "+" +
          val
            .slice(1)
            .replace(/[+]/g, "")
            .replace(/[^0-9]/g, "");
      } else {
        val = val.replace(/[+]/g, "").replace(/[^0-9]/g, "");
      }
      $(this).val(val);
    }

    if (inputType === "email") {
      const el = $(this);
      // email validation
      let val = $(this).val();
      // validation for email
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/;
      if (!emailRegex.test(val)) {
        el.addClass("is-error");
        showErrorMessages($(this));
        return;
      }
    }

    // save value to session storage
    hideErrorMessages($(this));
    saveInputValue($(this).attr("name"), $(this).val());
  });

  /**
   * -------------------------------------------------------------
   * Step 1 dynamic functions
   */
  $(".operator_company").on("click", handleRadioButtonClick);

  /**
   * handle final form submission
   */
  function submitLeadForm() {
    const $form = $("#lead-form");
    const excludedFields = ["operatorPrices", NO_LABEL_FOUND];
    const values = sessionStorage;

    Object.keys(values).map((key) => {
      if (excludedFields.includes(key)) return;
      if (Object.values(CHECKBOX_LABELS).includes(key)) {
        const arr = getType(values[key]) === "array" ? JSON.parse(values[key]) : [values[key]];
        const forMattedArr = arr.map((val) => (val?.includes(":") ? val.split(":")[1] + " GB" : val));
        $form.append(`<input type="hidden" name="${key}" data-name="${key}" value="${forMattedArr.join(",")}">`);
      } else $form.append(`<input type="hidden" name="${key}" data-name="${key}" value="${values[key]}">`);
    });

    // $(".loading_screen").removeClass("hide");
    $(".loading_screen").show(100);
    $(".loading-bar_line").animate(
      {
        width: "100%",
      },
      2900,
    );

    $form.submit();
    //resetDb();
  }

  $(".offer_button-wrapper button").on("click", function (e) {
    e.preventDefault();
    const value = $(this).attr("value");
    $(this).text(LOADING_TEXT);
    // set values to hidden fields
    const $form = $(".bidder_calc_form");
    const name = gv(FIRST_NAME) + " " + gv(LAST_NAME);
    const email = gv(EMAIL);
    const phone = gv(PHONE_NUMBER);

    $form.append(`<input type="hidden" name="Name" data-name="Name" value="${name}">`);
    $form.append(`<input type="hidden" name="Email" data-name="Email" value="${email}">`);
    $form.append(`<input type="hidden" name="Phone" data-name="Phone" value="${phone}">`);

    if (value === "Send offers to my email") {
      $form.append(`<input type="hidden" name="${SEND_OFFERS_TO_MY_EMAIL}" data-name="${SEND_OFFERS_TO_MY_EMAIL}" value="true">`);
    } else {
      $form.append(`<input type="hidden" name="${CONTACT_BY_AN_ADVISER}" data-name="${CONTACT_BY_AN_ADVISER}" value="true">`);
    }

    // submit form
    $form.trigger("submit");
  });
});
