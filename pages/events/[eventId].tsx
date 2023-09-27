import { getEvent, getFeatured } from "@/helpers/apis";
import { GetStaticPropsContext } from "next";
import { Event } from "@/helpers/types";

import Loader from "@/components/ui/Loader";
import Fallback from "@/components/ui/Fallback";
import EventDetails from "@/components/events/eventdetails/EventDetails";

interface PropsType {
  event: Event;
  error: string | null;
}

function EventDetailsPage({ event, error }: PropsType) {
  if (error) return <Fallback>{error}</Fallback>;
  if (!event) return <Loader />;

  return <EventDetails event={event} />;
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const { params } = context;
  const id = params?.eventId;
  const { data, error } = await getEvent(id);

  return {
    props: {
      event: data,
      error: error,
    },
    revalidate: 120,
  };
}
export async function getStaticPaths() {
  const { data } = await getFeatured();
  const params = data.map((event: Event) => ({
    params: { eventId: event.id },
  }));
  return {
    paths: params,
    fallback: true,
  };
}

export default EventDetailsPage;
