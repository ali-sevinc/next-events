import { useState, useEffect } from "react";

import { CommentType } from "@/helpers/types";

import { useNotification } from "@/context/notification-context";

import CommentList from "./CommentList";
import NewComment from "./NewComment";
import useAddComment from "./useAddComment";
import Loader from "../ui/Loader";

interface PropsType {
  eventId: string;
}

function Comments({ eventId }: PropsType) {
  const [showComments, setShowComments] = useState<boolean>(false);
  const [comments, setComments] = useState<CommentType[]>([]);

  const { showNotification, notification } = useNotification();
  const pending = notification?.status === "pending";

  const addComment = useAddComment();

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  async function addCommentHandler(commentData: CommentType) {
    const body = {
      id: eventId,
      ...commentData,
    };
    const data = await addComment(body);
    if (data) {
      setComments((prev) => [...prev, data]);
    }
  }

  useEffect(
    function () {
      async function getData() {
        if (showComments) {
          showNotification({
            title: "Loading...",
            message: "Comments data loading...",
            status: "pending",
          });
          const res = await fetch("/api/comments/" + eventId);
          if (!res.ok) {
            const errData = await res.json();
            showNotification({
              title: "Error",
              message: errData.message || "Ops.. Something went wrong...",
              status: "error",
            });
          } else {
            const data = await res.json();
            const selectedComments = data?.selectedComments;
            showNotification({
              title: "Success",
              message: "Comments successfully loaded",
              status: "success",
            });
            setComments(selectedComments);
          }
        }
      }
      getData();
    },
    [eventId, showComments, showNotification]
  );

  return (
    <section className="mx-auto my-12 w-11/12 max-w-2xl text-center">
      <button
        onClick={toggleCommentsHandler}
        className="rounded-md px-4 py-2 bg-transparent text-green-500 border border-green-500 hover:bg-green-200 mb-4"
      >
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && (
        <NewComment isLoading={pending} onAddComment={addCommentHandler} />
      )}
      {showComments && comments?.length > 0 && !pending && (
        <CommentList comments={comments} />
      )}
      {showComments && pending && <Loader />}
      {showComments && !comments?.length && !pending && (
        <p className="py-4 border-b border-b-stone-400 text-lg font-semibold italic">
          No comment found !
        </p>
      )}
    </section>
  );
}

export default Comments;
