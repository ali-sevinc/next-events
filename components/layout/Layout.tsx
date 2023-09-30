import { useNotification } from "@/context/notification-context";

import Notification from "@/components/ui/Notification";
import MainHeader from "./MainHeader";

function Layout({ children }: { children: React.ReactNode }) {
  const { notification } = useNotification();

  return (
    <>
      <MainHeader />
      <main>{children}</main>

      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      )}
    </>
  );
}

export default Layout;
