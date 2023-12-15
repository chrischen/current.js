import type { Preview } from "@storybook/react";
import '../src/global/static.css';
import { Container_make as Container } from "../src/components/shared/Layout.gen";
import { MemoryRouter } from 'react-router-dom';

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
    (Story) => (
      <Container>
        <MemoryRouter>
          {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
          <Story />
        </MemoryRouter>
      </Container>
    ),
  ],
};

export default preview;
