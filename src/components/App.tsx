import { Suspense } from "react";
import { graphql } from "react-relay";
import { css, cx } from "@linaria/core";
import { t } from "@lingui/macro";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import ServerTime from "./ServerTime";
import ServerTime2 from "./ServerTime2";
import { usePreloadedQuery } from "react-relay";
import { useLoaderData } from "react-router-dom";
import Counter from "./Counter";
import "./App.css";
import "./index.css";
import type { LoaderData } from './helpers/router'
import { loader } from './HomePageRoute'

// Component-styles and using @apply to abstract tailwind styles is discouraged.
// Abstractions should always be at the component level–not at the style level.
const header = css`
  text-transform: uppercase;
  font-size: 3em;
  @apply font-bold py-10 px-4;
`;

export const AppQuery = graphql`
  query AppQuery {
    ...ServerTimeFragment @defer
    ...ServerTime2Fragment @defer
  }
`;
function App() {
  const ref = useLoaderData() as LoaderData<typeof loader>;
  const data = usePreloadedQuery(AppQuery, ref);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo inline-block" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className={cx("logo react", "inline-block")}
            alt="React logo"
          />
        </a>
      </div>
      <h1 className={header}>{t`Hello`}</h1>
      <Suspense fallback="Loading">
        <ServerTime data={data} />
      </Suspense>
      <Suspense fallback="Loading">
        <ServerTime2 data={data} />
      </Suspense>
      <Counter />
      <p className="mb-4">
        This page demonstrates usage of <b>Lingui</b> for internationalization,{" "}
        <b>Tailwind</b> styles, and <b>Linaria</b> for component-specific
        styles. Additionally it is also rendered using React streaming SSR.
      </p>
      <div className="border-2 border-white rounded-md mb-4 p-4">
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
