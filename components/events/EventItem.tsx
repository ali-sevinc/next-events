import {
  MapPinIcon,
  CalendarDaysIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { changeAddress, changeDate } from "@/helpers/fncs";
import { Event } from "@/helpers/types";
import Button from "../ui/Button";

interface PropsType {
  event: Event;
}

function EventItem({ event }: PropsType) {
  const { title, image, date, location, id } = event;
  const readableDate = changeDate?.(date);
  const formatedAddress = changeAddress?.(location);

  return (
    <li className="w-full sm:max-w-[720px] h-64 sm:h-56 flex rounded-xl bg-white relative shadow-md">
      <img
        src={"/" + image}
        alt={title}
        className="w-2/5 h-full object-fill rounded-l-xl"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold pb-4">{title}</h2>
        <div className="font-bold text-stone-500">
          <div className="pb-2 flex">
            <CalendarDaysIcon width={24} height={24} />
            <time>{readableDate}</time>
          </div>
          <div className="flex">
            <MapPinIcon width={24} height={24} />
            <address>{formatedAddress}</address>
          </div>
        </div>
        <div className="absolute right-6 bottom-6">
          <Button href={`/events/${id}`}>
            Explore Event <ArrowRightIcon width={24} height={24} />
          </Button>
        </div>
      </div>
    </li>
  );
}

export default EventItem;
