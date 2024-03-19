module EventRsvpsStoryQuery = %relay(`
  query EventStoryQuery($after: String, $first: Int, $before: String) {
    event(id: "1") {
      __id
      title
      ...EventRsvps_event @arguments(after: $after, first: $first, before: $before)
    }
  }
`)
