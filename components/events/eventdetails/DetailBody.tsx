import { MapPinIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import { changeAddress, changeDate } from "@/helpers/fncs";

interface PropsType {
  image: string;
  date: string;
  location: string;
  title: string;
}
function DetailBody({ image, date, location, title }: PropsType) {
  const readableDate = changeDate?.(date);
  const formatedAddress = changeAddress?.(location);
  return (
    <div className="flex  bg-stone-700 p-8 rounded-2xl w-[680px] absolute top-48 z-10 ">
      <img
        src={"/" + image}
        alt={title}
        className="w-[250px] h-[250px] border-4 border-stone-200 rounded-full object-fill "
      />
      <div className="flex flex-col px-6 pt-6 ">
        <div className="pb-4">
          <CalendarDaysIcon
            width={32}
            height={32}
            className="text-green-500 text-xl"
          />
          <time className="pb-2 text-green-500 text-2xl">{readableDate}</time>
        </div>
        <div>
          <MapPinIcon width={32} height={32} className="text-green-500" />
          <address className="pt-2 text-green-500 text-xl">
            {formatedAddress}
          </address>
        </div>
      </div>
    </div>
  );
}

export default DetailBody;
