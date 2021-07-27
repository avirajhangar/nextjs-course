import { useRouter } from "next/router";
import EventList from "../../components/events/event-list";
import { getFilteredEvents } from "../../dummy";
function FilteredEventsPages() {
  const router = useRouter();

  const filterData = router.query.slug;
  if (!filterData) {
    return <p className="center">loading...</p>;
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
    return <p>Invalid Filter. Please adjust your values!</p>;
  }

  const filteredEvents = getFilteredEvents({ year: numYear, month: numMonth });

  if (!filteredEvents || filteredEvents.length === 0) {
    return <p>No events founds!</p>;
  }
  return <EventList items={filteredEvents} />;
}
export default FilteredEventsPages;
