import Head from "next/head";

import { getFeatured } from "@/helpers/apis";
import { Event } from "@/helpers/types";

import EventList from "@/components/events/EventList";
import Fallback from "@/components/ui/Fallback";
import Loader from "@/components/ui/Loader";
import NewsletterRegistration from "@/components/input/NewsletterRegistration";

interface PropsType {
  featured: Event[];
  error: string | null;
}

function HomePage({ featured, error }: PropsType) {
  if (error) return <Fallback>{error}</Fallback>;
  if (!featured.length) return <Loader />;

  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta name="description" content="Find a lot of great events..." />
      </Head>
      <NewsletterRegistration />
      <EventList events={featured} />
    </div>
  );
}

export async function getStaticProps() {
  const { data, error } = await getFeatured();

  return {
    props: {
      featured: data,
      error: error,
    },
    revalidate: 3600,
  };
}

export default HomePage;
