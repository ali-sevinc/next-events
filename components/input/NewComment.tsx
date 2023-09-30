import { useRef, useState, FormEvent } from "react";

import { emailRegex } from "@/helpers/fncs";

interface PropsType {
  onAddComment: ({
    email,
    name,
    text,
  }: {
    email: string;
    name: string;
    text: string;
    eventId?: string;
    _id?: string;
  }) => void;
  isLoading: boolean;
}

function NewComment({ onAddComment, isLoading }: PropsType) {
  const [isInvalid, setIsInvalid] = useState(false);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const commentInputRef = useRef<HTMLTextAreaElement>(null);

  function sendCommentHandler(event: FormEvent) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current?.value;
    const enteredName = nameInputRef.current?.value;
    const enteredComment = commentInputRef.current?.value;

    if (
      !enteredEmail ||
      enteredEmail.trim() === "" ||
      !emailRegex.test(enteredEmail) ||
      !enteredName ||
      enteredName.trim() === "" ||
      !enteredComment ||
      enteredComment.trim() === ""
    ) {
      setIsInvalid(true);
      return;
    }

    onAddComment({
      email: enteredEmail,
      name: enteredName,
      text: enteredComment,
    });
  }

  return (
    <form
      onSubmit={sendCommentHandler}
      className="mx-auto w-full rounded-md bg-green-500 shadow-md p-4 "
    >
      <div className="flex gap-4 flex-wrap">
        <div className="mb-2 flex-1 min-w-[10rem] ">
          <label
            htmlFor="email"
            className="block font-bold mb-2 text-white text-left "
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            ref={emailInputRef}
            className="p-1 rounded-md border border-stone-400 w-full bg-green-200"
          />
        </div>
        <div className="mb-2 flex-1 min-w-[10rem] ">
          <label
            htmlFor="name"
            className="block font-bold mb-2 text-white text-left "
          >
            Your name
          </label>
          <input
            type="text"
            id="name"
            ref={nameInputRef}
            className="p-1 rounded-md border border-stone-400 w-full bg-green-200"
          />
        </div>
      </div>
      <div className="mb-2 flex-1 min-w-[10rem] ">
        <label
          htmlFor="comment"
          className="block font-bold mb-2 text-white text-left "
        >
          Your comment
        </label>
        <textarea
          id="comment"
          rows={5}
          ref={commentInputRef}
          className="p-1 rounded-md border border-stone-400 w-full bg-green-200"
        ></textarea>
      </div>
      {isInvalid && <p>Please enter a valid email address and comment!</p>}
      <button
        className="text-green-500 px-2 py-1 rounded-md bg-stone-200 hover:text-green-700 disabled:hover-none disabled:text-stone-500 "
        disabled={isLoading}
      >
        {isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}

export default NewComment;
