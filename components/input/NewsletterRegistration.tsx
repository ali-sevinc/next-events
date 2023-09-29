import { FormEvent, useState } from "react";

export const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

function NewsletterRegistration() {
  const [email, setEmail] = useState<string>("");

  function registrationHandler(event: FormEvent) {
    event.preventDefault();
    if (!email || !emailRegex.test(email)) {
      return;
    }
    const body = { email };
    fetch("/api/news-letter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        setEmail("");
        console.log(data);
      });
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
    </section>
  );
}

export default NewsletterRegistration;
