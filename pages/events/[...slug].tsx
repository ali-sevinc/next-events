//------------SERVER SIDE RENDER----------------//
// import { useRouter } from "next/router";
// import { GetServerSidePropsContext } from "next";

// import { getSearchedEvents } from "@/helpers/apis";
// import { Event } from "@/helpers/types";

// import SearchResult from "@/components/events/SearchResult";
// import EventList from "@/components/events/EventList";
// import Fallback from "@/components/ui/Fallback";
// import Loader from "@/components/ui/Loader";

// interface PropsType {
//   searchedEvents: Event[];
//   error: string | null;
//   searchedDate: { year: number; month: number };
// }

// function FilteredEventsPage({
//   searchedEvents,
//   error,
//   searchedDate,
// }: PropsType) {
//   const router = useRouter();
//   if (!router.query.slug) return <Loader />;

//   if (error) return <Fallback>{error}</Fallback>;

//   const { year, month } = searchedDate;

//   const date = new Date(year, month - 1);

//   return (
//     <>
//       <SearchResult date={date} />
//       <EventList events={searchedEvents} />;
//     </>
//   );
// }

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const { params } = context;
//   const year = Number(params?.slug?.[0]);
//   const month = Number(params?.slug?.[1]);

//   if (
//   isNaN(year) ||
//   isNaN(month) ||
//   year > 2030 ||
//   year < 2021 ||
//   month < 1 ||
//   month > 12
// ) {
//     return {
//       props: {
//         error: "Invalid Search Queries...",
//       },
//     };
//   }

//   const { filteredData, error } = await getSearchedEvents({ year, month });

//   if (!filteredData?.length) {
//     return {
//       props: {
//         error: "No event found..",
//       },
//     };
//   }

//   return {
//     props: {
//       searchedEvents: filteredData,
//       error: error,
//       searchedDate: {
//         month,
//         year,
//       },
//     },
//   };
// }

// export default FilteredEventsPage;

//---------------CLIENT SIDE RENDER------------------------//
import Head from "next/head";

import { useRouter } from "next/router";
import useSearched from "@/components/input/useSearched";

import SearchResult from "@/components/events/SearchResult";
import EventList from "@/components/events/EventList";
import Fallback from "@/components/ui/Fallback";
import Loader from "@/components/ui/Loader";

function FilteredEventsPage() {
  const router = useRouter();
  const year = Number(router?.query?.slug?.[0]);
  const month = Number(router?.query?.slug?.[1]);
  const { error, events, isLoading } = useSearched({ year, month });

  const pageHead = (
    <Head>
      <title>Filtered Events</title>
      <meta name="description" content={`All events for ${month}/${year}`} />
    </Head>
  );

  if (error)
    return (
      <>
        {pageHead}
        <Fallback>{error}</Fallback>;
      </>
    );

  if (isLoading)
    return (
      <>
        {pageHead}
        <Loader />;
      </>
    );

  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2021 ||
    month < 1 ||
    month > 12
  ) {
    return (
      <>
        {pageHead}
        <Fallback>Invalid search queries...</Fallback>;
      </>
    );
  }
  const date = new Date(year, month - 1);

  if (!events.length) {
    return (
      <>
        {pageHead}
        <Fallback>No event found...</Fallback>;
      </>
    );
  }

  return (
    <>
      {pageHead}
      <SearchResult date={date} />
      <EventList events={events} />;
    </>
  );
}

export default FilteredEventsPage;
