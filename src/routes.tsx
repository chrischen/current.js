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
        hydrate={false}
      />
    );
  else return <RouterProvider router={router} fallbackElement={null} />;
};
