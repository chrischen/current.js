import { Environment, RecordSource, Store, Network } from "relay-runtime";
import type { FetchFunction, GraphQLResponse } from "relay-runtime";

// Relay stuff
const fetchGraphQL = async (
  text: string | null | undefined,
  variables: Record<string, unknown>
): Promise<GraphQLResponse> => {
  const response = await fetch(
    import.meta.env.API_ENDPOINT ?? "http://localhost:4555/graphql",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: text,
        variables,
      }),
    }
  );

  const resp = await response.json();
  // Get the response as JSON
  return resp;
};
// Relay passes a "params" object with the query name and text. So we define a helper function
// to call our fetchGraphQL utility with params.text.
const fetchRelay: FetchFunction = async (params, variables) => {
  // console.log(
  //   `fetching query ${params.name} with ${JSON.stringify(variables)}`,
  // );
  console.log("Fetching");
  return fetchGraphQL(params.text, variables);
};

// network is a singleton instance since it can be reused
const network = Network.create(fetchRelay);
const createEnvironment = ({ store }: { store: Store }): Environment => {
  const environment = new Environment({
    network,
    store,
  });
  return environment;
};
type RecordMap = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};
export function createStore() {
  let store: Store;
  if (import.meta.env.SSR) {
    store = new Store(new RecordSource());
  } else {
    store = new Store(
      new RecordSource(
        // eslint-disable-next-line no-underscore-dangle
        (
          window as Window &
            // eslint-disable-next-line no-underscore-dangle
            typeof globalThis & { __GRAPHQL_STATE__: RecordMap }
        ).__GRAPHQL_STATE__
      )
    );
  }
  return store;
}
export default createEnvironment;
