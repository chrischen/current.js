import { Meta } from '@storybook/react';
import { Suspense } from "react";
import { useFragment, useLazyLoadQuery, graphql } from 'react-relay';
// import { make as UserRsvps } from '../../components/organisms/UserRsvps.gen';
import { make as EventRsvps } from '../../components/organisms/EventRsvps.gen';
import { node } from '../../__generated__/EventRsvpsStoryQuery_graphql';

export default {
  title: 'Organisms/UserRsvps',
  component: EventRsvps,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
    relay: {
      query: node,
      getReferenceEntry: (queryResult) => ['event', queryResult.event],
      mockResolvers: {
        Event: () => ({
          rsvps: {
            edges: [{ node: { user: { lineUsername: "chris", rating: 1500 } } }, { node: { user: { lineUsername: "hasby", rating: 1200 } } }, { node: { user: { lineUsername: "bastardo", rating: 500 } } }], pageInfo: {
              hasNextPage: true,
              hasPreviousPage: false,
              endCursor: "dummyCursor"
            }
          }
        }),
        // User: () => (
        //   { username: "chris", rating: 1500 }
        // ),
      },
    }
  },
} as Meta<typeof EventRsvps>;

export const Default = {
  // render: () => {
  //   const data = useLazyLoadQuery(graphql`query EventRsvpsStoryQuery {
  //   user {
  //       ...EventRsvps_user
  //   }
  // }`, {});
  //
  //   console.log("DATA");
  //   return <RatedUser user={data.user} />;
  // },
};
