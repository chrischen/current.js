import React from "react";
import type { HelmetServerState } from "react-helmet-async";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "../App";
import { HelmetProvider } from "react-helmet-async";
import relay from "react-relay";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import environment from "./RelayEnvironment";
import { messages } from "../locales/jp/messages.po";

const { RelayEnvironmentProvider } = relay;
const helmetContext: { helmet: HelmetServerState | undefined } = {
  helmet: undefined,
};
i18n.load("jp", messages);
i18n.activate("jp");
const root = document.getElementById("root");
if (root)
  ReactDOM.hydrateRoot(
    root,
    <React.StrictMode>
      <RelayEnvironmentProvider environment={environment}>
        <I18nProvider i18n={i18n}>
          <HelmetProvider context={helmetContext}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </HelmetProvider>
        </I18nProvider>
      </RelayEnvironmentProvider>
    </React.StrictMode>
  );
console.log("hydrated");
