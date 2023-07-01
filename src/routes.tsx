// import App from "./App";
import React from "react";
import type { StaticHandlerContext } from "react-router-dom/server";
import type { Router } from "@remix-run/router";
import { RouterProvider, RouteObject } from "react-router-dom";
import { StaticRouterProvider } from "react-router-dom/server";
// import { Component as LazyPage } from './LazyPage';

const App = React.lazy(() => import("./App"));
// const App = React.lazy(() => import("./LazyPage"));
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    handle: "src/App.tsx",
  },
  {
    path: "/lazy",
    loader: () => {
      return null;
    },
    lazy: () => import("./LazyPageRoute"),
    handle: "src/LazyPageRoute.tsx",
  },
];

export const Wrapper = ({
  router,
  context,
}: {
  router: Router;
  context?: StaticHandlerContext;
}) => {
  if (import.meta.env.SSR)
    return (
      <StaticRouterProvider
        router={router}
        context={context as StaticHandlerContext}
      />
    );
  else return <RouterProvider router={router} fallbackElement={null} />;
};
