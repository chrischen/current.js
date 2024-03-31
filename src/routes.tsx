import type { StaticHandlerContext } from "react-router-dom/server";
import type { Router } from "@remix-run/router";
import { RouterProvider, RouteObject } from "react-router-dom";
import { StaticRouterProvider } from "react-router-dom/server";

export const routes: RouteObject[] = [
  {
    path: "/",
    lazy: () => import("./components/HomePageRoute"),
    // Declaring handle allows the server to pull the scripts needed based on
    // the entrypoint to avoid waterfall loading of dependencies
    handle: "src/components/HomePageRoute.tsx",
  },
  {
    path: "/lazy",
    loader: () => {
      return "data";
    },
    lazy: () => import("./components/LazyPageRoute"),
    handle: "src/components/LazyPageRoute.tsx",
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
        // React Router automatic hydration is disabled because we are handling
        // hydration via Relay manually
        // This means Loader functions must be synchronous, because they will be
        // called during hydration to to make sure the React tree matches the
        // server render.
        // This means no data can be passed from server to client except through
        // Relay
        hydrate={false}

      />
    );
  else return <RouterProvider router={router} future={{ v7_startTransition: true }} />;
};
