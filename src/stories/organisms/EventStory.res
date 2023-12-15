module EventRsvpsStoryQuery = %relay(`
  query EventStoryQuery {
    event(id: "1") {
      ...Event_event
    }
  }
`)
