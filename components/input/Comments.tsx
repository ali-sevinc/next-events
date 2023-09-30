import { useState, useEffect } from "react";

import { CommentType } from "@/helpers/types";

import CommentList from "./CommentList";
import NewComment from "./NewComment";
import useAddComment from "./useAddComment";

interface PropsType {
  eventId: string;
}

function Comments({ eventId }: PropsType) {
  const [showComments, setShowComments] = useState<boolean>(false);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { addComment, error } = useAddComment();

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  async function addCommentHandler(commentData: CommentType) {
    const body = {
      id: eventId,
      ...commentData,
    };
    setIsLoading(true);
    const data = await addComment(body);
    setIsLoading(false);
    if (data) {
      setComments((prev) => [...prev, data]);
    }
  }

  useEffect(
    function () {
      async function getData() {
        if (showComments) {
          setIsLoading(true);
          const res = await fetch("/api/comments/" + eventId);
          const data = await res.json();
          const selectedComments = data?.selectedComments;
          setComments(selectedComments);
          setIsLoading(false);
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
      {showComments && (
        <NewComment isLoading={isLoading} onAddComment={addCommentHandler} />
      )}
      {showComments && comments?.length > 0 && !isLoading && (
        <CommentList comments={comments} />
      )}
      {showComments && isLoading && (
        <p className="py-4 border-b border-b-stone-400 text-lg font-semibold italic">
          Loading....
        </p>
      )}
      {showComments && !comments?.length && !isLoading && !error && (
        <p className="py-4 border-b border-b-stone-400 text-lg font-semibold italic">
          No comment found !
        </p>
      )}
      {showComments && !comments?.length && !isLoading && error && (
        <p className="py-4 border-b text-red-500 border-b-stone-400 text-lg font-semibold italic">
          {error}
        </p>
      )}
    </section>
  );
}

export default Comments;
