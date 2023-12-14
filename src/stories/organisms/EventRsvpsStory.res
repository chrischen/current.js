module EventRsvpsStoryQuery = %relay(`
  query EventRsvpsStoryQuery {
    event(id: "1") {
      ...EventRsvps_event
    }
  }
`)
