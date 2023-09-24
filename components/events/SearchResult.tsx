import { changeDateShorter } from "@/helpers/fncs";
import Button from "../ui/Button";

interface PropsType {
  date: Date;
}

function SearchResult({ date }: PropsType) {
  const readableDate = changeDateShorter(date);

  return (
    <div className="w-56 mx-auto text-center flex flex-col gap-1 mt-4">
      <time className="font-bold text-lg">{readableDate}</time>
      <Button href="/events">Show All Events</Button>
    </div>
  );
}

export default SearchResult;
