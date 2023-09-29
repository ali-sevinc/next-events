import Head from "next/head";

import { getEvent, getFeatured } from "@/helpers/apis";
import { GetStaticPropsContext } from "next";
import { Event } from "@/helpers/types";

import Loader from "@/components/ui/Loader";
import Fallback from "@/components/ui/Fallback";
import EventDetails from "@/components/events/eventdetails/EventDetails";
import Comments from "@/components/input/Comments";

interface PropsType {
  event: Event;
  error: string | null;
  eventId: string;
  commentsData: {
    commentId: string;
    email: string;
    name: string;
    text: string;
  };
}

function EventDetailsPage({ event, error, eventId, commentsData }: PropsType) {
  if (error) return <Fallback>{error}</Fallback>;
  if (!event) return <Loader />;
  // console.log(eventId);
  return (
    <>
      <Head>
        <title>{event?.title}</title>
        <meta name="description" content={event?.description} />
      </Head>
      <EventDetails event={event} />;
      <Comments eventId={eventId} />
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const { params } = context;
  const id = params?.eventId;
  const { data, error } = await getEvent(id);

  return {
    props: {
      event: data,
      error: error,
      eventId: id,
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
