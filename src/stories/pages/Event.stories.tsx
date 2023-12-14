import { Meta } from '@storybook/react';
import { make as Event } from '../../components/pages/Event.gen';
import { node } from '../../__generated__/EventStoryQuery_graphql';

export default {
  title: 'Pages/Event',
  component: Event,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
    relay: {
      query: node,
      getReferenceEntry: (queryResult) => ['event', queryResult.event],
      mockResolvers: {
        Event: () => ({
          title: "Thursday Badminton",
          users: [{ lineUsername: "chris", rating: 1500 }, { lineUsername: "hasby", rating: 1200 }]
        }),
        // User: () => (
        //   { username: "chris", rating: 1500 }
        // ),
      },
    }
  },
} as Meta<typeof Event>;

export const Default = {
};
