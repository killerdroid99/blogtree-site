import { create } from "zustand";
import { nanoid } from "nanoid";

type Notification = {
  id: string;
  msg: string;
  type: "default" | "error";
};

interface NotificationState {
  notifications: Notification[];
  pushNotification: (msg: string, type: "default" | "error") => void;
  popNotification: () => void;
}

export const useNotification = create<NotificationState>((set) => ({
  notifications: [],
  pushNotification: (msg, type) =>
    set((state) => ({
      notifications: [...state.notifications, { id: nanoid(), msg, type }],
    })),
  popNotification: () =>
    set((state) => ({ notifications: state.notifications.slice(1) })),
}));
