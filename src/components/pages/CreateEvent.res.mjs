// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Form from "../molecules/forms/Form.res.mjs";
import * as Grid from "../vanillaui/atoms/Grid.res.mjs";
import * as React from "react";
import * as Caml_option from "rescript/lib/es6/caml_option.js";
import * as FormSection from "../molecules/forms/FormSection.res.mjs";
import * as WaitForMessages from "../shared/i18n/WaitForMessages.res.mjs";
import * as ReactHookForm from "react-hook-form";
import * as ReactRouterDom from "react-router-dom";
import * as JsxRuntime from "react/jsx-runtime";
import * as AppContext from "../layouts/appContext";
import * as RescriptRelay_Mutation from "rescript-relay/src/RescriptRelay_Mutation.res.mjs";
import * as CreateEventMutation_graphql from "../../__generated__/CreateEventMutation_graphql.res.mjs";

import { css, cx } from '@linaria/core'
;

import { t } from '@lingui/macro'
;

var convertVariables = CreateEventMutation_graphql.Internal.convertVariables;

var convertResponse = CreateEventMutation_graphql.Internal.convertResponse;

var convertWrapRawResponse = CreateEventMutation_graphql.Internal.convertWrapRawResponse;

RescriptRelay_Mutation.commitMutation(convertVariables, CreateEventMutation_graphql.node, convertResponse, convertWrapRawResponse);

var use = RescriptRelay_Mutation.useMutation(convertVariables, CreateEventMutation_graphql.node, convertResponse, convertWrapRawResponse);

function CreateEvent(props) {
  use();
  React.useState(function () {
        return "";
      });
  ReactRouterDom.useLoaderData();
  var now = new Date();
  var currentISODate = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
  var match = ReactHookForm.useForm({
        defaultValues: {
          title: "",
          location: "",
          startDate: currentISODate,
          endTime: "03:30",
          details: ""
        }
      });
  var handleSubmit = match.handleSubmit;
  var register = match.register;
  match.watch("title");
  var onSubmit = function (data) {
    console.log(data);
  };
  return JsxRuntime.jsx(WaitForMessages.make, {
              children: (function () {
                  return JsxRuntime.jsx("form", {
                              children: JsxRuntime.jsxs(Grid.make, {
                                    className: "grid-cols-1",
                                    children: [
                                      JsxRuntime.jsxs(FormSection.make, {
                                            title: t`Details specific to this event on the specified date and time.`,
                                            children: [
                                              JsxRuntime.jsx("div", {
                                                    children: JsxRuntime.jsx(Form.Input.make, {
                                                          label: t`Title`,
                                                          name: "title",
                                                          id: "title",
                                                          register: register("title", undefined)
                                                        }),
                                                    className: "col-span-full"
                                                  }),
                                              JsxRuntime.jsx("div", {
                                                    children: JsxRuntime.jsx(Form.Input.make, {
                                                          label: t`Location`,
                                                          name: "location",
                                                          id: "location",
                                                          register: register("location", undefined)
                                                        }),
                                                    className: "sm:col-span-2"
                                                  }),
                                              JsxRuntime.jsx("div", {
                                                    children: JsxRuntime.jsx(Form.Input.make, {
                                                          label: t`Date and Time`,
                                                          name: "startDate",
                                                          id: "startDate",
                                                          type_: "datetime-local",
                                                          register: register("startDate", undefined)
                                                        }),
                                                    className: "sm:col-span-2"
                                                  }),
                                              JsxRuntime.jsx("div", {
                                                    children: JsxRuntime.jsx(Form.Input.make, {
                                                          label: t`Date and Time`,
                                                          name: "endTime",
                                                          id: "endTime",
                                                          type_: "time",
                                                          register: register("endTime", undefined)
                                                        }),
                                                    className: "sm:col-span-2"
                                                  }),
                                              JsxRuntime.jsx("div", {
                                                    children: JsxRuntime.jsx(Form.TextArea.make, {
                                                          label: t`Details`,
                                                          name: "details",
                                                          id: "details",
                                                          hint: Caml_option.some(t`Any details from the location will already be included. Mention any additional event-specific instructions, rules, or details.`),
                                                          register: register("details", undefined)
                                                        }),
                                                    className: "col-span-full"
                                                  })
                                            ]
                                          }),
                                      JsxRuntime.jsx(Form.Footer.make, {})
                                    ]
                                  }),
                              onSubmit: handleSubmit(onSubmit)
                            });
                })
            });
}

var make = CreateEvent;

export {
  make ,
}
/*  Not a pure module */
