import { ReactNode } from "react";
import Link from "next/link";

interface PropsType {
  children: ReactNode;
  href: string;
  type?: string;
  onClick?: () => void;
}

const styles =
  "text-xl bg-green-400 hover:bg-green-600 duration-200 text-stone-200  px-6 py-2 rounded-xl  flex items-center justify-center gap-2";

function Button({ children, href, type, onClick }: PropsType) {
  if (type === "button")
    return (
      <button onClick={onClick} className={styles}>
        {children}
      </button>
    );
  return (
    <Link href={href} className={styles}>
      {children}
    </Link>
  );
}

export default Button;
