import { useState } from "react";

import { useNotification } from "@/context/notification-context";

function useNewsletter() {
  const [data, setData] = useState();

  const { showNotification } = useNotification();

  async function addNewsletter(body: { email: string }) {
    showNotification({
      title: "Sending...",
      message: "Registering....",
      status: "pending",
    });
    const res = await fetch("/api/news-letter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const errData = await res.json();
      showNotification({
        title: "Error",
        message: errData?.message || "Ops.. Something went wrong...",
        status: "error",
      });
    } else {
      const data = await res.json();
      showNotification({
        title: "Success",
        message: "Successfully signed up!",
        status: "success",
      });
      setData(data);
    }
  }

  return { data, addNewsletter };
}

export default useNewsletter;
