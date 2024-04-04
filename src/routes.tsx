import type { RouteObject } from "react-router-dom";
export const routes: RouteObject[] = [
  {
    path: "/:lang?",
    lazy: async () => ({
      ...(await import("./components/shared/Lang.gen")),
      Component: (await import("./components/shared/LangProvider.gen")).make,
    }),
    handle: "src/components/shared/Lang.gen.tsx",
    HydrateFallbackElement: <>Loading Fallback...</>,
    children: [
      {
        path: "",
        // Declaring handle allows the server to pull the scripts needed based on
        // the entrypoint to avoid waterfall loading of dependencies
        lazy: () => import("./components/routes/DefaultLayoutRoute.gen"),
        handle: "src/components/routes/DefaultLayoutRoute.gen.tsx",
        HydrateFallbackElement: <>Loading Fallback...</>,
        children: [
          {
            path: "",
            index: true,
            lazy: () => import("./components/pages/Events.gen"),
            handle: "src/components/pages/Events.gen.tsx",
            HydrateFallbackElement: <>Loading Fallback...</>,
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
            lazy: () => import("./components/routes/CreateEventRoute.gen"),
            handle: "src/components/routes/CreateEventRoute.gen.tsx",

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
