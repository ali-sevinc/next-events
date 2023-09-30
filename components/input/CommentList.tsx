interface PropsType {
  comments: { _id?: string; text: string; name: string; email: string }[];
}
function CommentList({ comments }: PropsType) {
  return (
    <ul className="flex flex-col gap-4 pt-8">
      {comments.map((item) => (
        <li
          key={item._id}
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
