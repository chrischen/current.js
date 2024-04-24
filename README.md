# Current.js

Current-generation enterprise-grade production ready front end stack.

## Features

### Core
- React 18 streaming SSR
- Relay Modern + Rescript Relay
- Typescript + Rescript
- Vite + SWC
- React Router + Relay query preloading

### CSS
- Tailwind
- Linaria for optional component styles

### Internationalization
- Lingui

### Testing
- React testing library
- Vitest + Rescript Vitest
- Playwright for E2E tests
- Storybook for interactive component testing

### Deployment
- Dockerfile

## TODO

### EventsList
EventList is a component for showing a list of events. The list can be filtered
by various facets, such as all public events, viewer's confirmed events, etc.
- [ ] Bucket EventsList by date
- [ ] Map of EventsList events
- [ ] Calendar feed of EventsList

### EventsList Filters (views)
- [ ] Viewer's confirmed events list
- [ ] Events by activity name
- [x] Events by Location
- [ ] Events by train line

### Events
- [ ] Button to freeze event RSVP list
- [ ] Assign a Group to an Event (group owns the Event)
- [x] Unlisted events

### Location
- [ ] Assign a Group to a Location (group owns the location record)
- [ ] Add nearest train lines

### Group (club)
The Group model is like a user group. Groups own Events and Locations, and group
administrators can create those items and manage them.
- [ ] Group model
- [ ] Club membership model. Approved members can see group events in the public
  feed and join them.

### Ranked and Unranked league
There will be two ratings. One based on all logged games, and one for official
league games where all players must agree to the logging of the game. The Unranked ratings are hidden and used to show a low-resolution
rating for the purpose of matchmaking. Unranked ratings
can be logged by event organizers without the players' approvals.

The Ranked ratings will go on a public leader board and will show the player's
exact rating and overall ranking publicly.

- [ ] Add Ratings models
- [ ] UI for logging games
- [ ] UI for viewing match history
- [ ] Show rating tier (casual ratings) next to RSVP user
- [ ] User profile pages showing match history, ratings, ranked league rating

