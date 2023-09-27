import Image from "next/image";

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
    <li className="w-full sm:max-w-[720px] h-64 lg:h-72 flex flex-row lg:flex-col rounded-xl bg-white relative shadow-md">
      <Image
        src={"/" + image}
        priority={true}
        alt={title}
        width={480}
        height={360}
        className="w-2/5 lg:w-full h-full lg:h-1/2 object-cover rounded-l-xl lg:rounded-t-xl lg:rounded-l-none"
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
