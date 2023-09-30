import { useState } from "react";

function useNewsletter() {
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState();
  async function addNewsletter(body: { email: string }) {
    const res = await fetch("/api/news-letter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (res.status === 500) {
      const errData = await res.json();
      setError(errData.message);
      return;
    }
    const data = await res.json();
    setData(data);
  }

  return { error, data, addNewsletter };
}

export default useNewsletter;
