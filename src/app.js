console.log("Scripts LOADER ______ LOCALHOST");

const sv = (key, val) => sessionStorage.setItem(key, val);
const gv = (key) => sessionStorage.getItem(key);
const rmv = (key) => sessionStorage.removeItem(key);

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

$(function () {
  // TODO: on pageload check if current input fields has saved values
  // if yes, then fetch thsose and set to fields

  // TODO: Implement required field validation

  // TODO: Implement form submission, on last step

  function saveInputValue(name, val) {
    sv(name, val);
  }

  function handleButtonClick(e) {
    const $el = $(e.currentTarget);
    // ui state updates
    $el.addClass("is-active");
    $el.siblings().removeClass("is-active");

    // save value to session storage
    const $input = $el.find("input");
    saveInputValue($input.attr("name"), $input.val());
  }

  // radio button field on click
  $(".service-form").on("click", ".radio_button, .radio_button-sm", handleButtonClick);

  // checkbox field on click
  $(".service-form").on("click", ".checkbox_button, .checkbox_accpetance", function (e) {
    const $el = $(e.currentTarget);
    $el.toggleClass("is-active");
    // save value to session storage
    const $input = $el.find("input[type='checkbox']");
    saveInputValue($input.attr("name"), $input.is(":checked"));
  });

  $(".service-form input").on("input", function () {
    if ($(this).attr("type") === "checkbox") return;
    if ($(this).attr("type") === "radio") return;
    // save value to session storage
    saveInputValue($(this).attr("name"), $(this).val());
  });

  /**
   * -------------------------------------------------------------
   * Step 1 dynamic functions
   */
  $(".operator_company").on("click", handleButtonClick);

  /**
   * -------------------------------------------------------------
   * Step 3 dynamic functions
   */
  const sizeFieldsWrap = $(".size-fields-wrapper");
  const defaultSizeField = $(".form-field-container[data-default]");
  let cloneCount = 1;

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
    $clone.find("input").val("");
    $clone.find("input").prop("checked", false);
    $clone.find(".w-checkbox-input--inputType-custom").removeClass("w--redirected-checked");

    // update attributes of input fields
    const inputFields = $clone.find("input");
    inputFields.each(function (index, el) {
      // name, id, for
      const name = $(el).attr("name");
      const newName = name.replace(name.split("-")[0], cloneCount);
      $(el).attr("name", newName);
      $(el).attr("id", newName);
      $(el).siblings(".subs_checkbox-label").attr("for", newName);

      const dataName = $(el).data("name");
      const newDataName = dataName.replace(dataName.split(":")[0], cloneCount);
      $(el).attr("data-name", newDataName);
    });

    // append to parent
    sizeFieldsWrap.append($clone);
  });

  // handle delete size field
  sizeFieldsWrap.on("click", ".delete-size", function () {
    // remove element
    $(this).closest(".form-field-container").remove();
    // update serial numbers
    const serialNums = sizeFieldsWrap.find(".calculator-sub-title_num");
    serialNums.each(function (index, el) {
      $(el).text(formatNumber(index + 1));
    });
  });
  // ========================================== END STEP 3
});
