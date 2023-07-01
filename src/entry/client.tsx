import React, { startTransition } from "react";
import type { HelmetServerState } from "react-helmet-async";
import { hydrateRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { RelayEnvironmentProvider } from "react-relay";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import createEnvironment, { createStore } from "./RelayEnvironment";
import { RecordSource } from "relay-runtime";
import type { RecordMap } from "./RelayEnvironment";
import { messages } from "../locales/jp/messages";
import { createBrowserRouter } from "react-router-dom";
import { matchRoutes } from "react-router";
import { routes, Wrapper } from "../routes";
// const { RelayEnvironmentProvider } = relay;

const helmetContext: { helmet: HelmetServerState | undefined } = {
  helmet: undefined,
};
i18n.load("jp", messages);
i18n.activate("jp");
const app = document.getElementById("root");

const environment = createEnvironment({ store: createStore() });

const updateRelayStore = (relayData: RecordMap): void => {
  environment.getStore().publish(new RecordSource(relayData));
};
declare global {
  interface Window {
    updateRelayStore: (relayData: RecordMap) => void | undefined;
    __GRAPHQL_STATE__: RecordMap;
    __READY_TO_BOOT__: boolean;
  }
}
window.__READY_TO_BOOT__ = true;
window.updateRelayStore = updateRelayStore;

if (window.__GRAPHQL_STATE__) updateRelayStore(window.__GRAPHQL_STATE__);

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

  const router = createBrowserRouter(routes);

  const jsx = (
    <React.StrictMode>
      <RelayEnvironmentProvider environment={environment}>
        <I18nProvider i18n={i18n}>
          <HelmetProvider context={helmetContext}>
            <Wrapper router={router} />
          </HelmetProvider>
        </I18nProvider>
      </RelayEnvironmentProvider>
    </React.StrictMode>
  );

  startTransition(() => {
    hydrateRoot(app, jsx);
  });
}

if (app) {
  hydrate(app);
  // if (import.meta.env.PROD) hydrateRoot(app, jsx);
  // else createRoot(app).render(jsx);
  // setTimeout(() => {

  // const hydrate = () => {
  //   startTransition(() => {
  //     hydrateRoot(app, jsx);
  //     console.log("hydrated");
  //   });
  // };
  // // }, 1000);
  // if (typeof requestIdleCallback === "function") {
  //   requestIdleCallback(hydrate);
  // } else {
  //   // Safari doesn't support requestIdleCallback
  //   // https://caniuse.com/requestidlecallback
  //   setTimeout(hydrate, 1);
  // }
}
