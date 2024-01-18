// // import App, { AppQuery } from "./App";
// import { make as Users } from "../organisms/Users";
// import { graphql } from "react-relay";
// // import type { AppQuery as AppQueryType } from "./__generated__/AppQuery.graphql";
// import { loadQuery, type Environment } from "react-relay";
// import { getRelayEnv } from "../../entry/RelayEnv";
//
// const Query = graphql`
//   query CurrentTime {
//     currentTime
//   }
// `;
// export const loader = ({
//   context,
// }: {
//   context?: { environment: Environment };
// }) => {
//   const r = loadQuery(
//     getRelayEnv(context, import.meta.env.SSR),
//     Query,
//     {},
//     { fetchPolicy: "store-or-network" }
//   );
//   return r;
// };
//
// export const Component = () => {
//   return <Users />;
// };
//
// export const handle = "src/components/routes/UsersRoute.tsx";
