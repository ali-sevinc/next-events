import { useNotification } from "@/context/notification-context";
import { CommentType } from "@/helpers/types";

function useAddComment() {
  const { showNotification } = useNotification();
  async function addComment(body: CommentType) {
    let data;
    showNotification({
      title: "Loading",
      message: "Comment data sending...",
      status: "pending",
    });
    const res = await fetch("/api/comments", {
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
      const resData = await res.json();
      showNotification({
        title: "Success",
        message: "Comment successfully added..",
        status: "success",
      });
      data = resData.comment;
    }
    return data;
  }

  return addComment;
}

export default useAddComment;
