import { FormEvent, useState } from "react";

import { emailRegex } from "@/helpers/fncs";

import useNewsletter from "./useNewsletter";

function NewsletterRegistration() {
  const [email, setEmail] = useState<string>("");
  const { addNewsletter, data, error } = useNewsletter();

  function registrationHandler(event: FormEvent) {
    event.preventDefault();
    if (!email || !emailRegex.test(email)) {
      return;
    }
    const body = { email };
    addNewsletter(body);
    setEmail("");
  }

  return (
    <section className="mx-auto w-11/12 max-w-xs ">
      <h2 className="text-center font-bold pt-6 pb-4">
        Sign up to stay updated!
      </h2>

      <form onSubmit={registrationHandler}>
        <div className="flex">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            className="p-1 rounded-l-md border border-stone-200 flex-1"
          />
          <button className="bg-green-500 border border-green-500  text-green-200 rounded-r-md hover:bg-green-700 active:bg-green-700 hover:border-green-700 active:border-green-700 px-1">
            Register
          </button>
        </div>
      </form>
      {error && <p className="text-center text-xs text-red-500">{error}</p>}
      {data && (
        <p className="text-center text-xs text-green-500">Successfully added</p>
      )}
    </section>
  );
}

export default NewsletterRegistration;
