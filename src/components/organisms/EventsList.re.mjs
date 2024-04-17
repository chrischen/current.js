// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Util from "../shared/Util.re.mjs";
import * as ReactIntl from "react-intl";
import * as Caml_option from "rescript/lib/es6/caml_option.js";
import * as Core__Option from "@rescript/core/src/Core__Option.re.mjs";
import * as Core from "@linaria/core";
import * as Caml_splice_call from "rescript/lib/es6/caml_splice_call.js";
import * as ReactRouterDom from "react-router-dom";
import * as ReactExperimental from "rescript-relay/src/ReactExperimental.re.mjs";
import * as JsxRuntime from "react/jsx-runtime";
import * as RescriptRelay_Fragment from "rescript-relay/src/RescriptRelay_Fragment.re.mjs";
import * as EventsList_event_graphql from "../../__generated__/EventsList_event_graphql.re.mjs";
import * as EventsListFragment_graphql from "../../__generated__/EventsListFragment_graphql.re.mjs";
import * as DifferenceInMinutes from "date-fns/differenceInMinutes";
import * as EventsListRefetchQuery_graphql from "../../__generated__/EventsListRefetchQuery_graphql.re.mjs";

import { css, cx } from '@linaria/core'
;

import { t, plural } from '@lingui/macro'
;

var getConnectionNodes = EventsListFragment_graphql.Utils.getConnectionNodes;

var convertFragment = EventsListFragment_graphql.Internal.convertFragment;

function use(fRef) {
  return RescriptRelay_Fragment.useFragment(EventsListFragment_graphql.node, convertFragment, fRef);
}

function useOpt(fRef) {
  return RescriptRelay_Fragment.useFragmentOpt(fRef !== undefined ? Caml_option.some(Caml_option.valFromOption(fRef)) : undefined, EventsListFragment_graphql.node, convertFragment);
}

var makeRefetchVariables = EventsListRefetchQuery_graphql.Types.makeRefetchVariables;

var convertRefetchVariables = EventsListRefetchQuery_graphql.Internal.convertVariables;

function useRefetchable(fRef) {
  return RescriptRelay_Fragment.useRefetchableFragment(EventsListFragment_graphql.node, convertFragment, convertRefetchVariables, fRef);
}

function usePagination(fRef) {
  return RescriptRelay_Fragment.usePaginationFragment(EventsListFragment_graphql.node, fRef, convertFragment, convertRefetchVariables);
}

function useBlockingPagination(fRef) {
  return RescriptRelay_Fragment.useBlockingPaginationFragment(EventsListFragment_graphql.node, fRef, convertFragment, convertRefetchVariables);
}

var Fragment = {
  getConnectionNodes: getConnectionNodes,
  Types: undefined,
  Operation: undefined,
  convertFragment: convertFragment,
  use: use,
  useOpt: useOpt,
  makeRefetchVariables: makeRefetchVariables,
  convertRefetchVariables: convertRefetchVariables,
  useRefetchable: useRefetchable,
  usePagination: usePagination,
  useBlockingPagination: useBlockingPagination
};

var convertFragment$1 = EventsList_event_graphql.Internal.convertFragment;

function use$1(fRef) {
  return RescriptRelay_Fragment.useFragment(EventsList_event_graphql.node, convertFragment$1, fRef);
}

function useOpt$1(fRef) {
  return RescriptRelay_Fragment.useFragmentOpt(fRef !== undefined ? Caml_option.some(Caml_option.valFromOption(fRef)) : undefined, EventsList_event_graphql.node, convertFragment$1);
}

var ItemFragment = {
  Types: undefined,
  Operation: undefined,
  convertFragment: convertFragment$1,
  use: use$1,
  useOpt: useOpt$1
};

function make(key, id) {
  return [
          key,
          id
        ];
}

function toId(param) {
  return param[1];
}

var NodeId = {
  toId: toId,
  make: make
};

function toDomain(t) {
  var match = t.split(":");
  if (match.length !== 2) {
    return {
            TAG: "Error",
            _0: "InvalidNode"
          };
  }
  var key = match[0];
  var id = match[1];
  return {
          TAG: "Ok",
          _0: [
            key,
            id
          ]
        };
}

var NodeIdDto = {
  toDomain: toDomain
};

function ts(prim0, prim1) {
  return Caml_splice_call.spliceApply(t, [
              prim0,
              prim1
            ]);
}

function EventsList$EventItem(props) {
  var match = use$1(props.event);
  var startDate = match.startDate;
  var endDate = match.endDate;
  var playersCount = Core__Option.getOr(Core__Option.flatMap(match.rsvps, (function (rsvps) {
              return Core__Option.map(rsvps.edges, (function (edges) {
                            return edges.length;
                          }));
            })), 0);
  var duration = Core__Option.flatMap(startDate, (function (startDate) {
          return Core__Option.map(endDate, (function (endDate) {
                        return DifferenceInMinutes.differenceInMinutes(Util.Datetime.toDate(endDate), Util.Datetime.toDate(startDate));
                      }));
        }));
  var duration$1 = Core__Option.map(duration, (function (duration) {
          var hours = duration / 60;
          var minutes = (duration | 0) % 60;
          if (minutes === 0) {
            return plural(hours | 0, {
                        one: t`${hours.toString()} hour`,
                        other: t`${hours.toString()} hours`
                      });
          } else {
            return JsxRuntime.jsxs(JsxRuntime.Fragment, {
                        children: [
                          plural(hours | 0, {
                                one: t`${hours.toString()} hour`,
                                other: t`${hours.toString()} hours`
                              }),
                          " ",
                          plural(minutes, {
                                one: t`${minutes.toString()} minute`,
                                other: t`${minutes.toString()} minutes`
                              })
                        ]
                      });
          }
        }));
  return JsxRuntime.jsxs("li", {
              children: [
                JsxRuntime.jsxs("div", {
                      children: [
                        JsxRuntime.jsxs("div", {
                              children: [
                                JsxRuntime.jsx("div", {
                                      children: JsxRuntime.jsx("div", {
                                            className: "h-2 w-2 rounded-full bg-current"
                                          }),
                                      className: Core.cx("text-green-400 bg-green-400/10", "flex-none rounded-full p-1")
                                    }),
                                JsxRuntime.jsx("h2", {
                                      children: JsxRuntime.jsxs(ReactRouterDom.Link, {
                                            to: "./events/" + match.id,
                                            children: [
                                              JsxRuntime.jsx("span", {
                                                    children: Core__Option.getOr(match.title, t`[Missing Title]`),
                                                    className: "truncate"
                                                  }),
                                              JsxRuntime.jsx("span", {
                                                    children: "/",
                                                    className: "text-gray-600"
                                                  }),
                                              JsxRuntime.jsx("span", {
                                                    children: Core__Option.getOr(Core__Option.map(startDate, (function (startDate) {
                                                                return JsxRuntime.jsx(ReactIntl.FormattedDate, {
                                                                            value: Util.Datetime.toDate(startDate)
                                                                          });
                                                              })), "???"),
                                                    className: "whitespace-nowrap"
                                                  }),
                                              JsxRuntime.jsx("span", {
                                                    className: "absolute inset-0"
                                                  })
                                            ],
                                            className: "flex gap-x-2"
                                          }),
                                      className: "min-w-0 text-sm font-semibold leading-6 text-white"
                                    })
                              ],
                              className: "flex items-center gap-x-3"
                            }),
                        JsxRuntime.jsxs("div", {
                              children: [
                                JsxRuntime.jsx("p", {
                                      children: Core__Option.getOr(Core__Option.flatMap(match.location, (function (l) {
                                                  return Core__Option.map(l.name, (function (name) {
                                                                return name;
                                                              }));
                                                })), t`[Location Missing]`),
                                      className: "truncate"
                                    }),
                                JsxRuntime.jsx("svg", {
                                      children: JsxRuntime.jsx("circle", {
                                            cx: (1).toString(),
                                            cy: (1).toString(),
                                            r: (1).toString()
                                          }),
                                      className: "h-0.5 w-0.5 flex-none fill-gray-600",
                                      viewBox: "0 0 2 2"
                                    }),
                                JsxRuntime.jsxs("p", {
                                      children: [
                                        Core__Option.getOr(Core__Option.map(startDate, (function (startDate) {
                                                    return JsxRuntime.jsx(ReactIntl.FormattedTime, {
                                                                value: Util.Datetime.toDate(startDate)
                                                              });
                                                  })), null),
                                        Core__Option.getOr(Core__Option.map(duration$1, (function (duration) {
                                                    return JsxRuntime.jsxs(JsxRuntime.Fragment, {
                                                                children: [
                                                                  " (",
                                                                  duration,
                                                                  ") "
                                                                ]
                                                              });
                                                  })), null)
                                      ],
                                      className: "whitespace-nowrap"
                                    })
                              ],
                              className: "mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-600"
                            })
                      ],
                      className: "min-w-0 flex-auto"
                    }),
                JsxRuntime.jsxs("div", {
                      children: [
                        playersCount.toString() + " ",
                        plural(playersCount, {
                              one: "player",
                              other: "players"
                            })
                      ],
                      className: Core.cx("text-indigo-400 bg-indigo-400/10 ring-indigo-400/30", "rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-inset")
                    })
              ],
              className: "relative flex items-center space-x-4 py-4"
            });
}

var EventItem = {
  ts: ts,
  make: EventsList$EventItem
};

function EventsList(props) {
  ReactExperimental.useTransition();
  var match = usePagination(props.events);
  var data = match.data;
  var events = getConnectionNodes(data.events);
  var pageInfo = data.events.pageInfo;
  var hasPrevious = pageInfo.hasPreviousPage;
  return JsxRuntime.jsxs(JsxRuntime.Fragment, {
              children: [
                hasPrevious && !match.isLoadingPrevious ? Core__Option.getOr(Core__Option.map(pageInfo.startCursor, (function (startCursor) {
                              return JsxRuntime.jsx(ReactRouterDom.Link, {
                                          to: "./?before=" + startCursor,
                                          children: t`load previous`
                                        });
                            })), null) : null,
                JsxRuntime.jsx("ul", {
                      children: events.map(function (edge) {
                            return JsxRuntime.jsx(EventsList$EventItem, {
                                        event: edge.fragmentRefs
                                      }, edge.id);
                          }),
                      className: "divide-y divide-gray-200",
                      role: "list"
                    }),
                match.hasNext && !match.isLoadingNext ? Core__Option.getOr(Core__Option.map(pageInfo.endCursor, (function (endCursor) {
                              return JsxRuntime.jsx(ReactRouterDom.Link, {
                                          to: "./?after=" + endCursor,
                                          children: t`load more`
                                        });
                            })), null) : null
              ]
            });
}

var make$1 = EventsList;

var $$default = EventsList;

export {
  Fragment ,
  ItemFragment ,
  NodeId ,
  NodeIdDto ,
  EventItem ,
  make$1 as make,
  $$default as default,
}
/*  Not a pure module */
