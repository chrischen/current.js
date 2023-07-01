// import relay from "react-relay";
import { useLazyLoadQuery, graphql } from "react-relay";
import type { ServerTimeQuery } from "./__generated__/ServerTimeQuery.graphql";
// const { useLazyLoadQuery, graphql } = relay;

const ServerTimeQuery = graphql`
  query ServerTimeQuery {
    currentTime
  }
`;
function ServerTime() {
  const data = useLazyLoadQuery<ServerTimeQuery>(ServerTimeQuery, {});

  return <p>{data.currentTime}</p>;
}

export default ServerTime;
