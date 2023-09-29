import { MapPinIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import { changeAddress, changeDate } from "@/helpers/fncs";
import Image from "next/image";

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
    <div className=" mx-4 lg:mx-auto flex flex-col md:flex-row bg-stone-700 p-8 rounded-2xl max-w-[680px] translate-y-[-3rem] ">
      <Image
        src={"/" + image}
        priority={true}
        alt={title}
        width={240}
        height={240}
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
