import type { Preview } from "@storybook/react";
import '../src/global/static.css';
import { Container_make as Container } from "../src/components/shared/Layout.gen";
import {
  RouterProvider,
  createMemoryRouter,
  defer
} from "react-router-dom";
import { I18nProvider } from '@lingui/react';
import { i18n } from '@lingui/core';

const FAKE_EVENT = { data: "test event", i18nLoaders: [] };


i18n.activate("en");
const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => {
      const routes = [
        {
          path: "/",
          /* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */
          element: <Story />,
          loader: () => defer(FAKE_EVENT),
        },
      ];
      const router = createMemoryRouter(routes, {
        initialEntries: ["/"],
        initialIndex: 0,
      });
      return (
        <Container>
          <I18nProvider i18n={i18n}>
            <RouterProvider router={router} />
          </I18nProvider>
        </Container>
      )
    },
  ],
};

export default preview;
