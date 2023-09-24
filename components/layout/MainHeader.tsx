import Link from "next/link";

function MainHeader() {
  return (
    <header className="flex justify-around items-center bg-stone-700 py-8 text-stone-200">
      <div>
        <Link href="/" className="text-4xl font-bold">
          NextEvents
        </Link>
      </div>
      <nav>
        <ul className="text-xl">
          <li>
            <Link href="/events">All Events</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;
