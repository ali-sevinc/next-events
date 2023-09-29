import { useState, useEffect } from "react";

import CommentList from "./CommentList";
import NewComment from "./NewComment";

type CommentType = { email: string; name: string; text: string };

interface PropsType {
  eventId: string;
}

function Comments({ eventId }: PropsType) {
  const [showComments, setShowComments] = useState<boolean>(false);
  const [comments, setComments] = useState([]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData: CommentType) {
    const body = {
      id: eventId,
      ...commentData,
    };

    fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((resData) => {
        const updatedData = resData?.data?.body;
        setComments(updatedData);
      });
  }

  useEffect(
    function () {
      async function getData() {
        if (showComments) {
          const res = await fetch("/api/comments/" + eventId);
          const data = await res.json();
          const selectedComments = data?.selectedComments?.body;
          setComments(selectedComments);
        }
      }
      getData();
    },
    [eventId, showComments]
  );

  return (
    <section className="mx-auto my-12 w-11/12 max-w-2xl text-center">
      <button
        onClick={toggleCommentsHandler}
        className="rounded-md px-4 py-2 bg-transparent text-green-500 border border-green-500 hover:bg-green-200 mb-4"
      >
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && comments?.length > 0 && (
        <CommentList comments={comments} />
      )}
      {showComments && !comments?.length && (
        <p className="py-4 border-b border-b-stone-400 text-lg font-semibold italic">
          No comment found yet!
        </p>
      )}
    </section>
  );
}

export default Comments;
