import { Fragment } from "react";
import { getEventByID, getAllEvents } from "../../helpers/api-utils";
import Head from "next/head";

import EventContent from "../../components/event-detail/event-content";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventSummary from "../../components/event-detail/event-summary";
import LogisticsItem from "../../components/event-detail/logistics-item";

function EventDetail(props) {
  const event = props.event;
  if (!event) {
    return <h2>no event found</h2>;
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary summary={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const currentEvent = await getEventByID(eventId);

  return {
    props: {
      event: currentEvent,
    },
    revalidate: 300,
  };
}

export async function getStaticPaths() {
  const events = await getAllEvents();
  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths: paths,
    fallback: "blocking",
  };
}

export default EventDetail;
