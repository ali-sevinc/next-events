import Button from "../ui/Button";
import { FormEvent, useRef } from "react";

const months = [
  { id: "1", month: "January" },
  { id: "2", month: "February" },
  { id: "3", month: "March" },
  { id: "4", month: "April" },
  { id: "5", month: "May" },
  { id: "6", month: "June" },
  { id: "7", month: "July" },
  { id: "8", month: "August" },
  { id: "9", month: "September" },
  { id: "10", month: "October" },
  { id: "11", month: "November" },
  { id: "12", month: "December" },
];

interface PropsType {
  onSearch: (year: number, month: number) => void;
}

function EventsSearch({ onSearch }: PropsType) {
  const yearRef = useRef<HTMLSelectElement>(null);
  const monthRef = useRef<HTMLSelectElement>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const year = Number(yearRef.current?.value);
    const month = Number(monthRef.current?.value);
    const query = {
      year,
      month,
    };
    onSearch(year, month);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-3/4 flex justify-between mx-auto bg-stone-50 px-4 py-3 rounded-lg mt-10"
    >
      <div className="flex justify-center items-center gap-8">
        <div className="text-lg flex gap-3 items-center">
          <label htmlFor="year" className="font-semibold">
            Year
          </label>
          <select
            ref={yearRef}
            id="year"
            className="border border-stone-700 rounded-md w-48 p-1"
          >
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </select>
        </div>
        <div className="text-lg flex gap-3 items-center">
          <label htmlFor="month" className="font-semibold">
            Month
          </label>
          <select
            ref={monthRef}
            id="month"
            className="border border-stone-700 rounded-md w-48 p-1"
          >
            {months.map((month) => (
              <option key={month.id} value={month.id}>
                {month.month}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Button type="button" href={``}>
        Find Events
      </Button>
    </form>
  );
}

export default EventsSearch;
