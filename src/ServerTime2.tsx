import { graphql, useFragment } from "react-relay";
import { ServerTime2Fragment$key } from "./__generated__/ServerTime2Fragment.graphql";

const fragmentSpec = graphql`
  fragment ServerTime2Fragment on Query {
    currentTime2
  }
`;

function ServerTime(props: {
  data: ServerTime2Fragment$key;
}) {
  const data = useFragment(fragmentSpec, props.data);
  return <p>{data.currentTime2}</p>;
}

export default ServerTime;
