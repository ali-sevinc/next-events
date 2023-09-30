import {
  ReactNode,
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
} from "react";

type NotificationType = {
  title: string;
  message: string;
  status: string;
};
interface StateType {
  notification: NotificationType | null;
  showNotification: ({}: NotificationType) => void;
  hideNotification: () => void;
}
interface ActionType {
  type: "show" | "hide";
  payload?: { title: string; message: string; status: string };
}

const initialState: StateType = {
  notification: null,
  showNotification: () => {},
  hideNotification: () => {},
};

type ReducerType = (state: StateType, action: ActionType) => StateType;

const NotificationContext = createContext(initialState);

function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case "show":
      return {
        ...state,
        notification: action.payload!,
      };
    case "hide":
      return {
        ...state,
        notification: null,
      };

    default:
      return state;
  }
}

export default function NotificationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer<ReducerType>(reducer, initialState);

  const { notification, hideNotification, showNotification } = state;

  const handleShow = useCallback(function handleShow(
    notificationData: NotificationType
  ) {
    dispatch({ type: "show", payload: notificationData });
  },
  []);

  const handleHide = useCallback(function handleHide() {
    dispatch({ type: "hide" });
  }, []);

  useEffect(
    function () {
      if (
        notification?.status === "success" ||
        notification?.status === "error"
      ) {
        const timer = setTimeout(() => {
          handleHide();
          console.log("Closing...");
        }, 3000);
        return () => {
          clearTimeout(timer);
        };
      }
    },
    [notification, handleHide]
  );

  return (
    <NotificationContext.Provider
      value={{
        notification,
        showNotification: handleShow,
        hideNotification: handleHide,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  return context;
}
