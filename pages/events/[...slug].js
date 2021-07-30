import { useEffect, useState } from "react";
import EventList from "../../components/events/event-list";
import useSWR from "swr";
import { useRouter } from "next/router";

function FilteredEventsPages() {
  const router = useRouter();

  const filterData = router.query.slug;

  const { data, error } = useSWR(
    "https://nextjs-course-9ca7b-default-rtdb.firebaseio.com/events.json"
  );
  const [events, setEvents] = useState();

  useEffect(() => {
    const events = [];

    for (const key in data) {
      events.push({
        id: key,
        ...data[key],
      });
    }
    setEvents(events);
  }, [data]);

  if (!filterData) {
    return <p>Events Loading</p>;
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2020 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return <p>Error</p>;
  }

  if (!events) {
    return <p>Events Loading</p>;
  }

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length == 0) {
    return <p>No events founds!</p>;
  }

  return <EventList items={filteredEvents} />;
}

// export async function getServerSideProps(context) {
//   const { params } = context;

//   const filterData = params.slug;

//   const filteredYear = filterData[0];
//   const filteredMonth = filterData[1];

//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2020 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       props: { hasError: true },
//       // notFound: true,
//     };
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   return {
//     props: { events: filteredEvents },
//   };
// }

export default FilteredEventsPages;
