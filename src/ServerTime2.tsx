// import relay from "react-relay";
import { useLazyLoadQuery, graphql } from "react-relay";
import type { ServerTime2Query } from "./__generated__/ServerTime2Query.graphql";
// const { useLazyLoadQuery, graphql } = relay;

const ServerTime2Query = graphql`
  query ServerTime2Query {
    currentTime2
  }
`;
function ServerTime() {
  const data = useLazyLoadQuery<ServerTime2Query>(ServerTime2Query, {});

  return <p>{data.currentTime2}</p>;
}

export default ServerTime;
