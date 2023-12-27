module EventRsvpsStoryQuery = %relay(`
  query EventRsvpsStoryQuery($after: String, $first: Int) {
    event(id: "1") {
      id
      ...EventRsvps_event @arguments(after: $after, first: $first)
    }
  }
`)
