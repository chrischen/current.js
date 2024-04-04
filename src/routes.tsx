import type { RouteObject } from "react-router-dom";
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
