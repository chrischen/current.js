import type { StaticHandlerContext } from "react-router-dom/server";
import type { Router } from "@remix-run/router";
import { RouterProvider, RouteObject } from "react-router-dom";
import { StaticRouterProvider } from "react-router-dom/server";

export const routes: RouteObject[] = [
  {
    path: "/",
    // Declaring handle allows the server to pull the scripts needed based on
    // the entrypoint to avoid waterfall loading of dependencies
    lazy: () => import("./components/pages/DefaultLayout.gen"),
    handle: "src/components/pages/DefaultLayout.gen.tsx",
    children: [
      {
        index: true,
        lazy: () => import("./components/pages/Events.gen"),
        handle: "src/components/pages/Events.gen.tsx",
      },
      {
        path: "members",
        lazy: () => import("./components/routes/UsersRoute.jsx"),
        // Declaring handle allows the server to pull the scripts needed based on
        // the entrypoint to avoid waterfall loading of dependencies
        handle: "src/components/routes/UsersRoute.tsx",

      },
      {
        path: "events/:eventId",
        lazy: () => import("./components/pages/Event.gen"),
        handle: "src/components/pages/Event.gen.tsx",

      }
    ]
  }
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
