import { useState } from "react";
import { css, cx } from "@linaria/core";
import { t } from "@lingui/macro";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "./index.css";

// Component-styles and using @apply to abstract tailwind styles is discouraged.
// Abstractions should always be at the component level–not at the style level.
const header = css`
  text-transform: uppercase;
  font-size: 3em;
  @apply font-bold py-10 px-4;
`;

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount((count) => count + 1)}>
      count is {count}
    </button>
  );
}

export default function LazyPage() {
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
      <Counter />
      <p className="mb-4">
        React Router Lazy-Loaded route
      </p>
    </>
  );
}
