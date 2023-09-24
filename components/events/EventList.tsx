import { Event } from "@/helpers/types";
import EventItem from "./EventItem";

interface PropsType {
  events: Event[];
}

function EventList({ events }: PropsType) {
  return (
    <ul className="flex flex-col gap-5 justify-center items-center w-[90%] my-16 mx-auto">
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </ul>
  );
}

export default EventList;
