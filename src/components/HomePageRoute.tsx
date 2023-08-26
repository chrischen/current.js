import App, { AppQuery } from "./App";
import type { AppQuery as AppQueryType } from "./__generated__/AppQuery.graphql";
import { loadQuery, type Environment } from "react-relay";
import { getRelayEnv } from "../entry/RelayEnv.mjs";

export const loader = ({
  context,
}: {
  context?: { environment: Environment };
}) => {
  return loadQuery<AppQueryType>(
    getRelayEnv(context, import.meta.env.SSR),
    AppQuery,
    {},
    { fetchPolicy: "store-or-network" }
  );
};

export const Component = () => {
  return <App />;
};

export const handle = "src/HomePageRoute.tsx";
