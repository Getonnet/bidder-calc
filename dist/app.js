// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"ezQqb":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 50619;
var HMR_SECURE = false;
var HMR_ENV_HASH = "42036d7a98ade5a7";
module.bundle.HMR_BUNDLE_ID = "bfcbaa651269b41d";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && ![
        "localhost",
        "127.0.0.1",
        "0.0.0.0"
    ].includes(hostname) ? "wss" : "ws";
    var ws;
    try {
        ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === "undefined" ? typeof chrome === "undefined" ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        if (e.message) console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"fJe33":[function(require,module,exports) {
console.log("Scripts LOADER ______ LOCALHOST: 5.0.0");
const CHECKBOX_LABELS = {
    "subscription-important_features": "What is most important to you in a mobile subscription?",
    subscription_size: "Size-of-the-subscription"
};
const SUBSCRIBER_TYPE = {
    "Only for me": "individual",
    "For several/Family": "family"
};
const SUBSCRIBER_TYPE_KEY = "Subscription-are-for";
const NO_LABEL_FOUND = "__NO__LABEL__FOUND__";
const LEAD_FORM_SUBMIT_BUTTON_ID = "submit-first-form-btn";
const FIRST_NAME = "First-name";
const LAST_NAME = "Last-name";
const EMAIL = "Email";
const PHONE_NUMBER = "Phone-number";
const OPERATOR_PRICES = "operatorPrices";
const SEND_OFFERS_TO_MY_EMAIL = "Send offers to my email";
const CONTACT_BY_AN_ADVISER = "Contact by an adviser";
const LOADING_TEXT = "Laster inn ...";
const HAS_ACTIVE_SUBSCRIPTION_FIELD_NAME = "Do-you-have-any-current-subscription";
const CURRENT_OPERATOR_FIELD_NAME = "current-operator";
const OPERATOR_PRICES_WITH_PREFERENCES_POINTS = "OPERATOR_PRICES_WITH_PREFERENCES_POINTS";
const FILTER_VALUES = {
    PRICE: "price",
    PREFERENCES: "preferences"
};
const sv = (key, val)=>sessionStorage.setItem(key, val);
const gv = (key)=>sessionStorage.getItem(key);
const rmv = (key)=>sessionStorage.removeItem(key);
// const resetDb = () => {
//   // remove all session storage values, except for names, email, phone
//   Object.keys(sessionStorage).map((key) => {
//     if (IGNORED_KEYS_ON_RESET.includes(key)) return;
//     rmv(key);
//   });
// };
function flattenAndFindMax(arr) {
    // Flatten the array
    const flatArray = arr.flat(Infinity);
    // Find the highest number
    return Math.max(...flatArray);
}
const getSubscriberType = ()=>{
    const type = gv(SUBSCRIBER_TYPE_KEY);
    return {
        subscriberType: type,
        isIndividual: type === Object.keys(SUBSCRIBER_TYPE)[0],
        isFamily: type === Object.keys(SUBSCRIBER_TYPE)[1]
    };
};
const formatNumber = (num)=>{
    // Convert the number to a string
    let numStr = num.toString();
    // Check if the length is less than 2
    if (numStr.length < 2) // Prepend '0' to the string
    numStr = "0" + numStr;
    return numStr;
};
const getFormattedSizes = (sizes)=>{
    let result = {};
    if (!Array.isArray(sizes)) sizes = [
        sizes
    ];
    sizes.forEach((item)=>{
        let [key, value] = item.split(":");
        let [start, end] = value.split("-").map(Number);
        let valAvg = Math.ceil((start + end) / 2);
        if (!result[key]) result[key] = [
            valAvg
        ];
        else result[key] = [
            ...result[key],
            valAvg
        ];
    });
    return result;
};
const findClosestMatch = (size, prices)=>{
    const pricesNumArray = prices.map((x)=>parseInt(x.split("=")[0]));
    const closestMatch = pricesNumArray.reduce((prev, curr)=>{
        return Math.abs(curr - size) < Math.abs(prev - size) ? curr : prev;
    });
    return prices.find((x)=>x.split("=")[0] === closestMatch.toString());
};
const getTotalFromSizes = (prices, sizes)=>{
    // console.log("prices ------------")
    // console.log(prices)
    // console.log("sizes ------------")
    // console.log(sizes)
    let total = 0;
    const biggestSize = flattenAndFindMax(Object.values(sizes));
    let link = "";
    Object.keys(sizes).map((key)=>{
        sizes[key].map((item)=>{
            // "1=329,https://go.adt231.net/t/t?a=1784390855&as=1983089419&t=2&tk=1"
            let price = prices.find((x)=>x.split("=")[0] === item.toString());
            if (!price) {
                // if size is not found, find closest match
                price = findClosestMatch(item, prices);
                console.log("price not found for size", item);
                console.log("closest match", price);
            }
            total += parseInt(price ? price.split("=")[1] : 0);
            // get link for biggest size, each size can have different links
            if (item.toString() === biggestSize.toString()) link = price.split(",")[1];
        });
    });
    // average for all selected sizes
    return [
        Math.floor(total / Object.keys(sizes).length),
        link
    ];
};
const getPricesAndLinksPerSize = (prices, sizes)=>{
    let result = {};
    Object.keys(sizes).map((key)=>{
        sizes[key].map((item)=>{
            let selectedPrice = prices.find((x)=>x.split("=")[0] === item.toString());
            if (!selectedPrice) // if price is not found, find closest match
            selectedPrice = findClosestMatch(item, prices);
            const [price, link] = selectedPrice ? selectedPrice.split("=")[1].split(",") : [
                0,
                ""
            ];
            result[item] = {
                price: price.toString(),
                link
            };
        });
    });
    return result;
};
const getDataSizeForDisplay = ()=>{
    const currentSizes = gv(CHECKBOX_LABELS.subscription_size);
    const currentSizesIsArray = getType(currentSizes) === "array";
    const sizes = currentSizesIsArray ? JSON.parse(currentSizes) : [
        currentSizes
    ];
    // only keep first item, since range was removed (ex: 1:4-4 -> 4)
    const formattedSizes = sizes.map((size)=>{
        const [key, value] = size.split(":");
        return value.split("-")[0];
    });
    return [
        ...new Set(formattedSizes)
    ].sort((a, b)=>a - b);
};
const getType = (val)=>{
    try {
        const parsedValue = JSON.parse(val);
        if (Array.isArray(parsedValue)) return "array";
        return "object";
    } catch (e) {
        return typeof val;
    }
};
const getOldValuesAndUpdateUI = ()=>{
    const values = sessionStorage;
    Object.keys(values).map((key)=>{
        // update checkboxes
        if (Object.values(CHECKBOX_LABELS).includes(key)) {
            const arr = getType(values[key]) === "array" ? JSON.parse(values[key]) : [
                values[key]
            ];
            arr.map((val, i)=>{
                let $input = $(`input[data-name='${val}']`);
                if ($input.attr("type") === "checkbox") {
                    $input.prop("checked", true);
                    $input.siblings(".checkbox_circle").addClass("w--redirected-checked");
                }
                if (key === CHECKBOX_LABELS.subscription_size) $input = $(`[individual-sizes]:nth-child(${i + 1}) input[value='${val}']`);
                else $input = $(`input[value='${val}']`);
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
const show_filtered_and_sorted_operators = (operatorPrices)=>{
    let addedBestValue = false;
    // reset rating icon fill to #D9D9D8
    $(".rating_icon svg path").attr("fill", "#D9D9D8");
    // initiallyhide all offer cards
    $(".offer_card").hide();
    operatorPrices.forEach((item, i)=>{
        const $offer_card = $(`#${item.operatorName.toLowerCase()}`);
        if (!item.currentOperator && !addedBestValue) {
            // update best value badge
            $(".best_value-banner").appendTo($offer_card);
            addedBestValue = true;
        }
        // fix css order
        $offer_card.css({
            order: i + 1,
            display: item.currentOperator ? "none" : "flex"
        });
        // update price and links and rating
        $offer_card.find(".price_text-total").text(item.total + " nok");
        // $offer_card.find(".continue_button").attr("href", item.link)
        $offer_card.find(".button-link").attr("href", item.link);
        console.log($offer_card.find(".button-link"));
        // $offer_card.find(".average-price_text").text(Math.round(item.total) + " nok per måned")
        const dataSizes = getDataSizeForDisplay();
        // console.log(dataSizes)
        const priceAndSizesWrapper = $offer_card.find(".price-data-size-wrapper");
        dataSizes.forEach((size, i)=>{
            if (i === 0) {
                priceAndSizesWrapper.find(".data-size_text").html("<b>" + size + "</b> GB ");
                priceAndSizesWrapper.find(".average-price_text").text(item.pricesAndLinksPerSize[size].price + " nok/mnd");
                priceAndSizesWrapper.find(".continue_button").attr("href", item.pricesAndLinksPerSize[size].link);
                priceAndSizesWrapper.find(".button-link").attr("href", item.pricesAndLinksPerSize[size].link);
            } else {
                const $clone = priceAndSizesWrapper.clone();
                $clone.find(".data-size_text").html("<b>" + size + "</b> GB ");
                $clone.find(".average-price_text").text(item.pricesAndLinksPerSize[size].price + " nok/mnd");
                $clone.find(".continue_button").attr("href", item.pricesAndLinksPerSize[size].link);
                $clone.find(".button-link").attr("href", item.pricesAndLinksPerSize[size].link);
                $offer_card.find(".button-services.w-button").before($clone);
            }
        });
        // update rating number
        const rating = 5 - i < 2 ? 2 : 5 - i;
        $offer_card.find(".rating_text").text(rating + "/5");
        // add color to rating dots
        if (rating >= 5) $offer_card.find(".rating_icon svg path:lt(5)").attr("fill", "#F7A000");
        else if (rating >= 4) $offer_card.find(".rating_icon svg path:lt(4)").attr("fill", "#F8B200");
        else if (rating >= 3) $offer_card.find(".rating_icon svg path:lt(3)").attr("fill", "#7AC143");
        else $offer_card.find(".rating_icon svg path:lt(2)").attr("fill", "#A5BD9D");
    });
};
const merge_preferences_points_with_operator_prices = (operatorPrices, preferences)=>{
    // 3, 0, 0, 0, 5, 5;
    // 1:"A Lot Of Data For The Money"2:"Good Coverage"3:"I Want To Be Able To Share Data With My Family"4:"I Don T Want A Lock In Period"5:"Good Customer Service"6:"Other"
    let preferencesPoints = {};
    $(".preferences-points").each(function(index, el) {
        const $el = $(el);
        const points = $el.text();
        const name = $el.attr("name").toLowerCase();
        preferencesPoints[name] = points;
    });
    const formattedPreferencesPoints = {};
    Object.keys(preferencesPoints).map((k)=>{
        const pointsArr = preferencesPoints[k].split(",");
        if (pointsArr.length < 6) throw new Error("Invalid preferences points length, expected 6");
        formattedPreferencesPoints[k] = {
            "A Lot Of Data For The Money": Number(pointsArr[0]),
            "Good Coverage": Number(pointsArr[1]),
            "I Want To Be Able To Share Data With My Family": Number(pointsArr[2]),
            "I Don T Want A Lock In Period": Number(pointsArr[3]),
            "Good Customer Service": Number(pointsArr[4]),
            Other: Number(pointsArr[5])
        };
    });
    // console.log(operatorPrices);
    // console.log(preferences);
    // console.log(formattedPreferencesPoints);
    const operatorPricesWithPreferencesPoints = operatorPrices.map((operator)=>{
        const currentOperatorPoints = formattedPreferencesPoints[operator.operatorName.toLowerCase()];
        const totalPoints = preferences.map((p)=>currentOperatorPoints[p]).reduce((acc, curr)=>acc + curr, 0);
        return {
            ...operator,
            totalPoints
        };
    }).sort((a, b)=>b.totalPoints - a.totalPoints);
    // console.log(operatorPricesWithPreferencesPoints);
    // save to storage
    sv(OPERATOR_PRICES_WITH_PREFERENCES_POINTS, JSON.stringify(operatorPricesWithPreferencesPoints));
};
const save_subscription_size = (index, data)=>{
    console.log(data.from);
    const currentSizes = gv(CHECKBOX_LABELS.subscription_size);
    const currentSizesIsArray = getType(currentSizes) === "array";
    const sizes = currentSizesIsArray ? JSON.parse(currentSizes) : [
        currentSizes
    ];
    sizes[index] = `${index + 1}:${data.from}-${data.from}`;
    sv(CHECKBOX_LABELS.subscription_size, JSON.stringify(sizes));
};
const reInitSliders = ($selector = ".js-range-slider")=>{
    // if mobile, set data-grid to false
    if (window.innerWidth < 1024) $(`${$selector}`).attr("data-grid", false);
    else $(`${$selector}`).attr("data-grid", true);
    setTimeout(()=>{
        const $sliders = $(`${$selector}`);
        $sliders.each(function(index, el) {
            const $slider = $(el);
            const max = $slider.attr("max");
            const s = $slider.ionRangeSlider({
                values: [
                    ...Array.from({
                        length: max
                    }, (_, i)=>i),
                    max,
                    "Fri Data"
                ],
                prettify: function(value) {
                    if (value === "Fri Data") return "Fri Data";
                    return value + " GB";
                },
                onStart: function(data) {
                    // fired then range slider is ready
                    save_subscription_size(index, data);
                },
                onFinish: function(data) {
                    // fired on pointer release
                    save_subscription_size(index, data);
                }
            });
        });
    }, 300);
};
// on window resize, reinit sliders
window.addEventListener("resize", ()=>{
    // if width is less than 1024, reinit sliders
    if (window.innerWidth < 1024) reInitSliders();
});
$(function() {
    let $body = $("body");
    let currentStep = 1;
    const step1OptionalFields = $("[step-1-optional-field]");
    const optionalInputs = $(".optional-field input");
    /**
     * -------------------------------------------------------------
     * Show fullscreen loader
     */ function showFullScreenLoader() {
        const $loader = $(".loading_screen");
        if (!$loader.length) {
            console.warn("Loader not found");
            return;
        }
        $loader.show(100);
        $loader.find(".loading-bar_line").animate({
            width: "100%"
        }, 2900);
    }
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
        const { isIndividual, isFamily } = getSubscriberType();
        const currentSizes = gv(CHECKBOX_LABELS.subscription_size);
        const currentSizesIsArray = getType(currentSizes) === "array";
        // init range sliders
        reInitSliders();
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
             */ const sizeFieldsWrap = $(".size-fields-wrapper");
            const defaultSizeField = $(".form-field-container[individual-sizes]");
            let cloneCount = 1;
            /**
             * -------------------------------------------------------------
             * sizes field add or remove
             */ // handle add new size field
            $(".add-more-size_btn").on("click", function() {
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
                $clone.find("span.irs.irs--round.js-irs-0.irs-with-grid").remove();
                // update attributes of input fields
                const inputFields = $clone.find("input");
                inputFields.each(function(index, el) {
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
                // reinit sliders
                reInitSliders();
            });
            // handle delete size field
            sizeFieldsWrap.on("click", ".delete-size", function() {
                // cleanup session storage
                const $el = $(this);
                const parentEl = $el.closest("[individual-sizes]");
                const parentElPosition = parentEl.index();
                // const $inputs = $el.closest(".details_title-wrap").siblings(".form-block").find("input");
                const label = CHECKBOX_LABELS.subscription_size;
                const oldValues = JSON.parse(gv(label)); // this is always and array, since delete button only available for multiple sizes
                const newValues = oldValues.filter((_, i)=>i !== parentElPosition);
                saveInputValue(label, JSON.stringify(newValues));
                // remove element
                $(this).closest(".form-field-container").remove();
                // update serial numbers
                const serialNums = sizeFieldsWrap.find(".calculator-sub-title_num");
                serialNums.each(function(index, el) {
                    $(el).text(formatNumber(index + 1));
                });
                // reinit sliders
                reInitSliders();
            });
            // ========================================== END STEP 2
            /**
             * generate missing rows
             * (applicable for family only & when values are present in session storage)
             */ // extract everything before : and get unique values
            const selectedSizes = currentSizesIsArray ? JSON.parse(currentSizes) : [
                currentSizes
            ];
            // for each unique value, create a new row by duplicating the default row
            selectedSizes.forEach((_, i)=>{
                if (i === 0) return;
                $(".add-more-size_btn").trigger("click");
            });
        }
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
        if (operatorPrices) show_filtered_and_sorted_operators(operatorPrices);
        // show hide services
        const $buttonServices = $(".button-services");
        $buttonServices.on("click", function() {
            const $el = $(this);
            const $services = $el.closest(".offer_card").find(".operator-details").first();
            $services.slideToggle(250);
        });
    }
    function showErrorMessages($formChild) {
        $formChild.closest("form").siblings(".form-error-message").css({
            display: "block"
        });
    }
    function hideErrorMessages($formChild) {
        $formChild.removeClass("is-error");
        $formChild.closest("form").siblings(".form-error-message").css({
            display: "none"
        });
    }
    /**
     * -------------------------------------------------------------
     * Required field validation
     * on ".continue_button" link click, check if all required fields are filled
     * if not, then show error message, else continue to next page load
     */ $(".continue_button, .button.final-submit").on("click", function(e) {
        e.preventDefault();
        let errors = false;
        const $el = $(this);
        const link = $el.attr("href");
        const { isFamily, isIndividual } = getSubscriberType();
        const uniqueInputs = $("input").map(function() {
            return this.name;
        }).get();
        // Filter only the required inputs
        const requiredInputs = uniqueInputs.filter(function(name) {
            return $("[name='" + name + "'][required]").length > 0;
        });
        // unique values
        const uniqueRequiredInputs = [
            ...new Set(requiredInputs)
        ];
        uniqueRequiredInputs.forEach((name)=>{
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
        // --------------------------------- for first page
        if (currentStep === 1) {
            // if at least one checkbox under ".subscription-important_features" is not checked
            // then show error message
            const $checkboxes = $(".subscription-important_features input[type='checkbox']");
            const $checked = $checkboxes.filter((index, el)=>$(el).is(":checked"));
            if (!$checked.length) {
                errors = true;
                showErrorMessages($checkboxes.first());
            }
        }
        // --------------------------------- for repeater size fields
        if (currentStep === 2) {
            const $sizeFieldsWrap = $(".size-fields-wrapper");
            // Check if size fields wrapper exists and if it's either family or individual
            if ($sizeFieldsWrap.length && (isFamily || isIndividual)) {
                const $sizeFieldInputs = $sizeFieldsWrap.find("input.js-range-slider");
                // Check each range slider to ensure none are empty
                $sizeFieldInputs.each(function() {
                    if (!$(this).val()) {
                        errors = true;
                        showErrorMessages($(this));
                        return false; // break the loop on first error
                    }
                });
            }
        }
        if (errors) return;
        // --------------------------------- prices calculation
        if ($el.attr("id") === "calculate-prices") {
            // show full screen loader
            showFullScreenLoader();
            // calculate price offer for each operator
            const operatorPrices = [];
            const userType = gv(SUBSCRIBER_TYPE_KEY);
            const rawPricesPerOperator = $(`[data-type='${SUBSCRIBER_TYPE[userType]}']`);
            if (!rawPricesPerOperator.length) throw new Error("No prices found for the selected user type, check data-type attribute & printed data from webflow in page 2");
            const sizes = getFormattedSizes(JSON.parse(gv(CHECKBOX_LABELS.subscription_size)));
            // console.log("Sizes for prices calculation", sizes);
            // console.log("Raw prices per operator", rawPricesPerOperator);
            rawPricesPerOperator.each(function(index, el) {
                const $el = $(el);
                const operatorName = $el.attr("id");
                // if name matches current-operator, skip
                const prices = $el.text().split("\n");
                const [total, link] = getTotalFromSizes(prices, sizes);
                const pricesAndLinksPerSize = getPricesAndLinksPerSize(prices, sizes);
                operatorPrices.push({
                    operatorName,
                    total,
                    link,
                    currentOperator: gv(CURRENT_OPERATOR_FIELD_NAME)?.toLowerCase() === operatorName.toLowerCase(),
                    pricesAndLinksPerSize
                });
            });
            // sort by price
            operatorPrices.sort((a, b)=>a.total - b.total);
            // save to session storage
            sv("operatorPrices", JSON.stringify(operatorPrices));
            // navigate to next page
            setTimeout(()=>{
                window.location.href = link;
            }, 3000);
        } else if ($el.hasClass("final-submit")) {
            $el.text(LOADING_TEXT);
            submitLeadForm();
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
            let parsedOldValues = getType(oldValues) === "array" ? JSON.parse(oldValues) : [
                oldValues
            ];
            // update value at parent position
            parsedOldValues[parentElPosition] = $input.val();
            // const uniqueValues = [...new Set(parsedOldValues)];
            saveInputValue(CHECKBOX_LABELS.subscription_size, JSON.stringify(parsedOldValues));
        } else saveInputValue($name, $input.val());
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
    const handleCheckboxSelection = (e)=>{
        const $el = $(e.currentTarget);
        const $parent = $el.parent();
        if ($parent.hasClass("filter-form")) return;
        const $input = $el.find("input[type='checkbox']");
        // get key from parent based on CHECKBOX_LABELS
        let label = NO_LABEL_FOUND;
        Object.keys(CHECKBOX_LABELS).map((key)=>{
            if ($parent.hasClass(key)) label = CHECKBOX_LABELS[key];
        });
        const currentVal = gv(label);
        const oldValues = getType(currentVal) === "array" ? JSON.parse(currentVal) : [
            currentVal
        ];
        console.log(oldValues);
        if ($input.is(":checked")) {
            hideErrorMessages($input);
            // save value to session storage
            if (!oldValues) saveInputValue(label, JSON.stringify([
                $input.attr("data-name")
            ]));
            else saveInputValue(label, JSON.stringify([
                ...oldValues,
                $input.attr("data-name")
            ]));
        } else {
            // remove value from session storage
            const newValues = oldValues && oldValues.filter((val)=>val !== $input.attr("data-name"));
            saveInputValue(label, JSON.stringify(newValues));
        }
    };
    $(".service-form").on("click", ".checkbox_button, .checkbox_accpetance", handleCheckboxSelection);
    // filter checkbox: this works like radio button
    $(".filter-form").on("click", ".checkbox_button", function(e) {
        e.preventDefault();
        const $el = $(this);
        const $input = $el.find("input[type='checkbox']");
        const $label = $el.find(".checkbox_circle");
        const name = $input.attr("name");
        if ($input.is(":checked")) ;
        else {
            $input.prop("checked", true);
            $label.addClass("w--redirected-checked");
            // handle siblings
            const $siblings = $el.siblings();
            $siblings.find("input[type='checkbox']").prop("checked", false);
            $siblings.find(".checkbox_circle").removeClass("w--redirected-checked");
            if (name === FILTER_VALUES.PRICE) show_filtered_and_sorted_operators(JSON.parse(gv(OPERATOR_PRICES)));
            else show_filtered_and_sorted_operators(JSON.parse(gv(OPERATOR_PRICES_WITH_PREFERENCES_POINTS)));
        }
    });
    // text inputs: Step 3
    $(".service-form input").on("input", function() {
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
            if (val[0] === "+") val = "+" + val.slice(1).replace(/[+]/g, "").replace(/[^0-9]/g, "");
            else val = val.replace(/[+]/g, "").replace(/[^0-9]/g, "");
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
     */ $(".operator_company").on("click", handleRadioButtonClick);
    /**
     * -------------------------------------------------------------
     * on click buttons show hide form and
     * append hidden input field to form
     */ $(".offer_button-wrapper button").on("click", function(e) {
        e.preventDefault();
        // update ui state
        $(".offer_button-wrapper button").removeClass("is-active").delay(100);
        $(this).addClass("is-active");
        // Show the Lead form (multiple forms but sent as one)
        $(".service-form.final-form").show(100);
        const $form = $("#lead-form");
        // get the value of pressed button
        const value = $(this).attr("value");
        if (value === "Send offers to my email") {
            $form.append(`<input type="hidden" name="${SEND_OFFERS_TO_MY_EMAIL}" data-name="${SEND_OFFERS_TO_MY_EMAIL}" value="true">`);
            $form.find(`input[name='${CONTACT_BY_AN_ADVISER}']`).remove();
        } else {
            $form.append(`<input type="hidden" name="${CONTACT_BY_AN_ADVISER}" data-name="${CONTACT_BY_AN_ADVISER}" value="true">`);
            $form.find(`input[name='${SEND_OFFERS_TO_MY_EMAIL}']`).remove();
        }
    });
    /**
     * -------------------------------------------------------------
     * handle lead form submission
     */ function submitLeadForm() {
        const $form = $("#lead-form");
        const excludedFields = [
            "operatorPrices",
            NO_LABEL_FOUND
        ];
        const values = sessionStorage;
        Object.keys(values).map((key)=>{
            if (excludedFields.includes(key)) return;
            if (Object.values(CHECKBOX_LABELS).includes(key)) {
                const arr = getType(values[key]) === "array" ? JSON.parse(values[key]) : [
                    values[key]
                ];
                const forMattedArr = arr.map((val)=>val?.includes(":") ? val.split(":")[1] + " GB" : val);
                $form.append(`<input type="hidden" name="${key}" data-name="${key}" value="${forMattedArr.join(",")}">`);
            } else $form.append(`<input type="hidden" name="${key}" data-name="${key}" value="${key === OPERATOR_PRICES_WITH_PREFERENCES_POINTS ? "-" : values[key]}">`);
        });
        // push to datalayer
        window.dataLayer.push({
            event: "formSubmission",
            form_name: "bidder_lead_form"
        });
        // --- DONE gtm data push ---
        // submit the form
        $form.trigger("submit");
    }
});
/**
 * -------------------------------------------------------------
 * on successful form submission, reload the page
 * to clear the form fields
 * -------------------------------------------------------------
 */ $(document).ajaxComplete(function(event, xhr, settings) {
    if (settings.url.includes("https://webflow.com/api/v1/form/") || settings.url.includes("https://webflow.com/api/v2/form/")) {
        const isSuccessful = xhr.status === 200;
        const redirectFormName = "redirect-form-hehexd";
        const isRedirectForm = settings.data.includes(redirectFormName);
        console.log(isSuccessful);
        console.log(isRedirectForm);
        if (isRedirectForm && isSuccessful) window.location.reload();
        else if (!isRedirectForm) {
            if (isSuccessful) window.location.reload();
            else {
                console.error("Form submission failed");
                $(".button.final-submit").text("Submit");
            }
        }
    }
});

},{}]},["ezQqb","fJe33"], "fJe33", "parcelRequire3bc0")

