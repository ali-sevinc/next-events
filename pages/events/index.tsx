import { useRouter } from "next/router";

import { getAllEvents } from "@/dummy-data";

import EventList from "@/components/events/EventList";
import EventsSearch from "@/components/events/EventsSearch";

function EventsPage() {
  const allEvents = getAllEvents();
  const router = useRouter();

  function handleSearch(year: number, month: number) {
    const path = `/events/${year}/${month}`;
    router.push(path);
  }

  return (
    <>
      <EventsSearch onSearch={handleSearch} />
      <EventList events={allEvents} />
    </>
  );
}

export default EventsPage;
