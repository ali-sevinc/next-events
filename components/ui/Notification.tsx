import { useNotification } from "@/context/notification-context";

interface PropsType {
  title: string;
  message: string;
  status: string;
}

function Notification({ title, message, status }: PropsType) {
  const { hideNotification } = useNotification();
  let statusClasses = "";

  if (status === "success") {
    statusClasses = "bg-green-500";
  }

  if (status === "error") {
    statusClasses = "bg-red-500";
  }

  if (status === "pending") {
    statusClasses = "bg-blue-500";
  }

  return (
    <div
      className={`fixed bottom-0 left-0 h-20 text-xl w-full flex justify-between items-center text-stone-200 px-[10%] py-2 shadow-md ${statusClasses} `}
    >
      <h2>{title}</h2>
      <p>{message}</p>
      <button
        className="absolute top-1 right-1 text-3xl hover:scale-110"
        onClick={hideNotification}
      >
        &times;
      </button>
    </div>
  );
}

export default Notification;
