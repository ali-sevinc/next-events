import { useState, useEffect } from "react";
import { getSearchedEvents } from "@/helpers/apis";
import { Event } from "@/helpers/types";

function useSearched({ year, month }: { year: number; month: number }) {
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(
    function () {
      async function getData() {
        setIsLoading(true);
        const { filteredData, error } = await getSearchedEvents({
          year,
          month,
        });
        setEvents(filteredData);
        setError(error);
        setIsLoading(false);
      }
      getData();
    },
    [month, year]
  );

  return { events, error, isLoading };
}

export default useSearched;
