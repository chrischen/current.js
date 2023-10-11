import { graphql, useFragment } from "react-relay";
import { ServerTime2Fragment$key } from "./__generated__/ServerTime2Fragment.graphql";

const fragmentSpec = graphql`
  fragment ServerTime2Fragment on Query {
    currentTimeObj2 {
      currentTime
    }
  }
`;

function ServerTime(props: { data: ServerTime2Fragment$key }) {
  const data = useFragment(fragmentSpec, props.data);
  return <p>{data.currentTimeObj2?.currentTime}</p>;
}

export default ServerTime;
