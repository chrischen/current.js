import { graphql, useFragment } from "react-relay";
import { ServerTimeFragment$key } from "./__generated__/ServerTimeFragment.graphql";

const fragmentSpec = graphql`
  fragment ServerTimeFragment on Query {
    currentTime
  }
`;

function ServerTime(props: {
  data: ServerTimeFragment$key;
}) {
  const data = useFragment(fragmentSpec, props.data);

  return <p>{data.currentTime}</p>;
}

export default ServerTime;
