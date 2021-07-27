import { Fragment } from "react";
import { useRouter } from "next/router";
import { getEventById } from "../../dummy";

import EventContent from "../../components/event-detail/event-content";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventSummary from "../../components/event-detail/event-summary";
import LogisticsItem from "../../components/event-detail/logistics-item";

function EventDetail() {
  const router = useRouter();
  const eventId = router.query.eventId;
  const event = getEventById(eventId);

  if (!event) {
    return <h2>no event found</h2>;
  }

  return (
    <Fragment>
      <EventSummary summary={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.summary}</p>
      </EventContent>
    </Fragment>
  );
}
export default EventDetail;
