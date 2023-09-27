import Button from "./Button";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

function Fallback({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-center font-bold mt-12 max-w-xl mx-4 sm:mx-auto bg-stone-600 py-10 rounded-2xl ">
      <p className="text-stone-200 text-xl pb-2">{children}</p>
      <div className="w-48 mx-auto mt-2">
        <Button href={"/events"}>
          <ArrowLeftIcon height={24} width={24} />
          All Events
        </Button>
      </div>
    </div>
  );
}

export default Fallback;
