import { StrictMode } from "react";
import type { HelmetServerState } from "react-helmet-async";
import type { RecordMap } from "./RelayEnvironment";
import { HelmetProvider } from "react-helmet-async";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { RelayEnvironmentProvider } from "react-relay";
import { environment } from "./RelayEnv.mjs";
import { createBrowserRouter } from "react-router-dom";
import { matchRoutes } from "react-router";
import { routes, Wrapper } from "../routes";
import { bootOnClient } from "../../server/RelaySSRUtils.mjs";

const helmetContext: { helmet: HelmetServerState | undefined } = {
  helmet: undefined,
};
const app = document.getElementById("root");

declare global {
  interface Window {
    updateRelayStore: (relayData: RecordMap) => void | undefined;
    __RELAY_DATA: RecordMap[];
    __READY_TO_BOOT__: boolean;
  }
}

async function hydrate(app: HTMLElement) {
  // Determine if any of the initial routes are lazy
  const lazyMatches = matchRoutes(routes, window.location)?.filter(
    (m) => m.route.lazy
  );

  // Load the lazy matches and update the routes before creating your router
  // so we can hydrate the SSR-rendered content synchronously
  if (lazyMatches && lazyMatches?.length > 0) {
    await Promise.all(
      lazyMatches.map(async (m) => {
        const routeModule = await m.route.lazy!();
        Object.assign(m.route, { ...routeModule, lazy: undefined });
      })
    );
  }

  bootOnClient(app, () => {
    const router = createBrowserRouter(routes, { future: { v7_partialHydration: true}});

    const jsx = (
      <StrictMode>
        <RelayEnvironmentProvider environment={environment}>
          <HelmetProvider context={helmetContext}>
            <Wrapper router={router} />
          </HelmetProvider>
        </RelayEnvironmentProvider>
      </StrictMode>
    );
    return jsx;
  });
}

if (app) {
  hydrate(app);
}
