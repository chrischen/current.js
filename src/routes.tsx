import type { StaticHandlerContext } from "react-router-dom/server";
import type { Router } from "@remix-run/router";
import { RouterProvider, RouteObject } from "react-router-dom";
import { StaticRouterProvider } from "react-router-dom/server";

export const routes: RouteObject[] = [
  {
    path: "/:lang?",
    lazy: () => import("./components/pages/Lang.gen"),
    // lazy: () => import("./components/pages/DefaultLayout.gen"),
    handle: "src/components/pages/Lang.gen.tsx",
    children: [
      {
        path: "",
        // Declaring handle allows the server to pull the scripts needed based on
        // the entrypoint to avoid waterfall loading of dependencies
        lazy: () => import("./components/pages/DefaultLayout.gen"),
        handle: "src/components/pages/DefaultLayout.gen.tsx",
        children: [
          {
            path: "",
            index: true,
            lazy: () => import("./components/pages/Events.gen"),
            handle: "src/components/pages/Events.gen.tsx",
          },
          // {
          //   path: "",
          //   lazy: () => import("./components/pages/Events.gen"),
          //   handle: "src/components/pages/Events.gen.tsx",
          // },
          // {
          //   path: "members",
          //   lazy: () => import("./components/routes/UsersRoute.jsx"),
          //   // Declaring handle allows the server to pull the scripts needed based on
          //   // the entrypoint to avoid waterfall loading of dependencies
          //   handle: "src/components/routes/UsersRoute.tsx",
          //
          // },
          {
            path: "events/:eventId",
            lazy: () => import("./components/pages/Event.gen"),
            handle: "src/components/pages/Event.gen.tsx",

          },
          {
            path: "events/create",
            lazy: () => import("./components/pages/CreateEvent.gen"),
            handle: "src/components/pages/CreateEvent.gen.tsx",

          },
          {
            path: "*",
            Component: () => <div>Not Found</div>,
          }

        ]
      },
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
        hydrate={false}
      />
    );
  else return <RouterProvider router={router} fallbackElement={null} />;
};
