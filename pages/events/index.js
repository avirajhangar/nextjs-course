import { useRouter } from "next/router";

import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import { Fragment } from "react";
import { getAllEvents } from "../../helpers/api-utils";
import Head from "next/head";

function AllEventsPage(props) {
  const router = useRouter();
  const events = props.events;

  function findEventsHandler(year, month) {
    const fullpath = `/events/${year}/${month}`;
    router.push(fullpath);
  }

  return (
    <Fragment>
      <Head>
        <title>All Events</title>
        <meta name="description" content="This is a tutorial of next js" />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const allEvents = await getAllEvents();
  return {
    props: {
      events: allEvents,
    },
    revalidate: 1800,
  };
}

export default AllEventsPage;
