// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Core__Result from "@rescript/core/src/Core__Result.res.mjs";
import * as Json$JsonCombinators from "@glennsl/rescript-json-combinators/src/Json.res.mjs";
import * as Json_Decode$JsonCombinators from "@glennsl/rescript-json-combinators/src/Json_Decode.res.mjs";

var Helmet = {};

var Link = {};

function fromDate(d) {
  return d;
}

function parse(d) {
  return Core__Result.getExn(Core__Result.map(Json$JsonCombinators.decode(d, Json_Decode$JsonCombinators.string), (function (prim) {
                    return new Date(prim);
                  })));
}

function serialize(d) {
  return d.toString();
}

function toDate(d) {
  return d;
}

var Datetime = {
  parse: parse,
  serialize: serialize,
  fromDate: fromDate,
  toDate: toDate
};

export {
  Helmet ,
  Link ,
  Datetime ,
}
/* No side effect */
