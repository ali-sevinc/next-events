import EventDetails from "@/components/events/eventdetails/EventDetails";
import Fallback from "@/components/ui/Fallback";
import { getEventById } from "@/dummy-data";
import { useRouter } from "next/router";

function EventDetailsPage() {
  const router = useRouter();
  const eventId = router.query.eventId;
  const event = getEventById(eventId);

  if (!event) return <Fallback>No event found...</Fallback>;

  const { date, description, image, title, location } = event;

  return <EventDetails event={event} />;
}

export default EventDetailsPage;
