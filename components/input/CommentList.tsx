interface PropsType {
  comments: { commentId: string; text: string; name: string; email: string }[];
}
function CommentList({ comments }: PropsType) {
  return (
    <ul className="flex flex-col gap-4 pt-8">
      {comments.map((item) => (
        <li
          key={item.commentId}
          className="text-left px-0 py-2 border-b border-b-stone-400"
        >
          <p>{item.text}</p>
          <div className="text-right italic">
            By <address className="inline">{item.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
