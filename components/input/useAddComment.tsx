import { useState } from "react";

function useAddComment() {
  const [error, setError] = useState<string | null>(null);
  async function addComment(body: {}) {
    let data;
    const res = await fetch("/api/comments", {
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
    const resData = await res.json();
    console.log(resData);
    data = resData.comment;
    return data;
  }

  return { error, addComment };
}

export default useAddComment;
