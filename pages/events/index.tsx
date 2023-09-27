import { useRouter } from "next/router";
import { Event } from "@/helpers/types";
import { getEvents } from "@/helpers/apis";

import EventList from "@/components/events/EventList";
import EventsSearch from "@/components/events/EventsSearch";
import Loader from "@/components/ui/Loader";
import Fallback from "@/components/ui/Fallback";

interface PropsType {
  events: Event[];
  error: string | null;
}

function EventsPage({ events, error }: PropsType) {
  const router = useRouter();
  function handleSearch(year: number, month: number) {
    const path = `/events/${year}/${month}`;
    router.push(path);
  }

  if (error) return <Fallback>{error}</Fallback>;
  if (!events?.length && !error) return <Loader />;
  return (
    <>
      <EventsSearch onSearch={handleSearch} />
      <EventList events={events} />
    </>
  );
}

export async function getStaticProps() {
  const { data, error } = await getEvents();
  return {
    props: {
      events: data,
      error: error,
    },
    revalidate: 360,
  };
}

export default EventsPage;
