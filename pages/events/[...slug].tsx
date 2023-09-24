import { useRouter } from "next/router";

import { getFilteredEvents } from "@/dummy-data";

import EventList from "@/components/events/EventList";
import Loader from "@/components/ui/Loader";
import SearchResult from "@/components/events/SearchResult";
import Fallback from "@/components/ui/Fallback";

function FilteredEventsPage() {
  const router = useRouter();

  if (!router.query.slug) return <Loader />;

  const year = Number(router.query.slug[0]);
  const month = Number(router.query.slug[1]);

  if (isNaN(year) || isNaN(month)) {
    return <Fallback>Invalid search values...</Fallback>;
  }

  const filteredEvents = getFilteredEvents({ year, month });
  const date = new Date(year, month - 1);

  if (filteredEvents.length === 0) {
    return <Fallback>No Event Found</Fallback>;
  }

  return (
    <>
      <SearchResult date={date} />
      <EventList events={filteredEvents} />;
    </>
  );
}

export default FilteredEventsPage;
