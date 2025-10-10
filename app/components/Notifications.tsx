import { useEffect } from "react";
import { useNotification } from "~/stores/notification-store";

const Notifications = ({ ttl }: { ttl: number }) => {
  const { notifications, popNotification } = useNotification();

  useEffect(() => {
    if (notifications.length > 0) {
      const i = setInterval(() => {
        popNotification();
      }, ttl);

      return () => {
        clearInterval(i);
      };
    }
  }, [ttl, popNotification, notifications.length]);

  return (
    <div className="fixed bottom-4 right-4 flex flex-col-reverse gap-2 z-50">
      {notifications.map((n) => (
        <div
          key={n.id.toString()}
          className={`p-4 bg-zinc-900 animate-in slide-in-from-left rounded ring-ring ${n.type === "error" && "text-rose-500"}`}
        >
          {n.msg}
        </div>
      ))}
    </div>
  );
};

export default Notifications;
