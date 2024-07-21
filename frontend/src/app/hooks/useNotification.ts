import { useContext } from "react";
import { NotificationContext } from "../contexts/notifications";

export function useNotification() {
  const { clearAllNotifications, pushNotification, removeNotification } =
    useContext(NotificationContext);
  return {
    clearAllNotifications,
    pushNotification,
    removeNotification,
  };
}
