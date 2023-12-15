import { Meta } from '@storybook/react';
import { make as EventsList } from '../../components/organisms/EventsList.gen';
import { node } from '../../__generated__/EventsStoryQuery_graphql';

export default {
  title: 'Organisms/EventsList',
  component: EventsList,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
    relay: {
      query: node,
      getReferenceEntry: (queryResult) => {
        console.log(queryResult);
        return ['events', queryResult];
      },
     
      mockResolvers: {
        Event: () => ({
          title: "Thursday Badminton",
          location: "Akabanebashi",
          startDate: "2023-01-01T00:00:00.000Z",
        }),
        // User: () => (
        //   { username: "chris", rating: 1500 }
        // ),
      },
    }
  },
} as Meta<typeof EventsList>;

export const Default = {
};
