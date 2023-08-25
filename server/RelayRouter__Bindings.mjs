// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Js_dict from "rescript/lib/es6/js_dict.js";
import * as Belt_Int from "rescript/lib/es6/belt_Int.js";
import * as Belt_Array from "rescript/lib/es6/belt_Array.js";
import * as Belt_Option from "rescript/lib/es6/belt_Option.js";
import * as Caml_option from "rescript/lib/es6/caml_option.js";
import * as Belt_SortArray from "rescript/lib/es6/belt_SortArray.js";

function make() {
  return {};
}

function deleteParam(dict, key) {
  Js_dict.unsafeDeleteKey(dict, key);
}

function setParam(dict, key, value) {
  dict[key] = [value];
}

function setParamOpt(dict, key, value) {
  if (value !== undefined) {
    dict[key] = [Caml_option.valFromOption(value)];
    return ;
  } else {
    return Js_dict.unsafeDeleteKey(dict, key);
  }
}

function setParamInt(dict, key, value) {
  setParamOpt(dict, key, Belt_Option.map(value, (function (v) {
              return String(v);
            })));
}

function setParamBool(dict, key, value) {
  setParamOpt(dict, key, value !== undefined ? (
          value ? "true" : "false"
        ) : undefined);
}

function setParamArray(dict, key, value) {
  dict[key] = value;
}

function setParamArrayOpt(dict, key, value) {
  if (value !== undefined) {
    dict[key] = Caml_option.valFromOption(value);
    return ;
  } else {
    return Js_dict.unsafeDeleteKey(dict, key);
  }
}

function printValue(value) {
  return value.map(function (v) {
                return encodeURIComponent(v.trim());
              }).join(",");
}

function printKeyValue(key, value) {
  return key + "=" + printValue(value);
}

function toString(raw) {
  var parts = Js_dict.entries(raw).map(function (param) {
        return printKeyValue(param[0], param[1]);
      });
  var match = parts.length;
  if (match !== 0) {
    return "?" + parts.join("&");
  } else {
    return "";
  }
}

function toStringStable(raw) {
  var parts = Belt_SortArray.stableSortBy(Js_dict.entries(raw), (function (param, param$1) {
            if (param[0].localeCompare(param$1[0]) > 0) {
              return 1;
            } else {
              return -1;
            }
          })).map(function (param) {
        return printKeyValue(param[0], param[1]);
      });
  var match = parts.length;
  if (match !== 0) {
    return "?" + parts.join("&");
  } else {
    return "";
  }
}

function decodeValue(value) {
  return value.split(",").map(function (v) {
              return decodeURIComponent(v);
            });
}

function parse(search) {
  var dict = {};
  var search$1 = search.startsWith("?") ? search.slice(1) : search;
  var parts = search$1.split("&");
  parts.forEach(function (part) {
        var keyValue = part.split("=");
        var match = Belt_Array.get(keyValue, 0);
        var match$1 = Belt_Array.get(keyValue, 1);
        if (match !== undefined && match$1 !== undefined) {
          dict[match] = decodeValue(match$1);
          return ;
        }
        
      });
  return dict;
}

function getParamByKey(parsedParams, key) {
  return Belt_Array.get(Belt_Option.getWithDefault(Js_dict.get(parsedParams, key), []), 0);
}

var getArrayParamByKey = Js_dict.get;

function getParamInt(parsedParams, key) {
  var raw = getParamByKey(parsedParams, key);
  if (raw !== undefined) {
    return Belt_Int.fromString(raw);
  }
  
}

function getParamBool(parsedParams, key) {
  var match = getParamByKey(parsedParams, key);
  if (match === undefined) {
    return ;
  }
  switch (match) {
    case "false" :
        return false;
    case "true" :
        return true;
    default:
      return ;
  }
}

var $$URL = {};

function applyPayload(t, entry) {
  var response = entry.response;
  if (response === undefined) {
    return ;
  }
  var $$final = entry.final;
  if ($$final !== undefined) {
    t.next(response);
    if ($$final) {
      t.complete();
      return ;
    } else {
      return ;
    }
  }
  
}

var RelayReplaySubject = {
  applyPayload: applyPayload
};

var QueryParams = {
  make: make,
  setParam: setParam,
  setParamOpt: setParamOpt,
  setParamArray: setParamArray,
  setParamArrayOpt: setParamArrayOpt,
  setParamInt: setParamInt,
  setParamBool: setParamBool,
  deleteParam: deleteParam,
  toString: toString,
  toStringStable: toStringStable,
  parse: parse,
  getParamByKey: getParamByKey,
  getArrayParamByKey: getArrayParamByKey,
  getParamInt: getParamInt,
  getParamBool: getParamBool
};

export {
  QueryParams ,
  $$URL ,
  RelayReplaySubject ,
}
/* No side effect */
