import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/common/LoadingSpinner";

import { IoSettingsOutline } from "react-icons/io5";
import { FaComment, FaUser } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const NotificationPage = () => {
  // const isLoading = false;

  const queryClient = useQueryClient();

  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notificationsKey"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/notifications/`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong.");
        }

        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
  });

  const { mutate: deleteNotifications } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/notifications/`,
          { method: "DELETE", credentials: "include" }
        );
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong.");
        }

        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      toast.success("Your notifications have been deleted.");
      queryClient.invalidateQueries({ queryKey: ["notificationsKey"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // const deleteNotifications = () => {
  //   alert("All notifications deleted");
  // };

  return (
    <>
      <div className="flex-[4_4_0] border-l border-r border-gray-700 min-h-screen">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <p className="font-bold">Notifications</p>
          <div className="dropdown ">
            <div tabIndex={0} role="button" className="m-1">
              <IoSettingsOutline className="w-4 h-4 text-gray-600 dark:text-gray-300 transition-all duration-300 hover:rotate-90 hover:text-blue-500 dark:hover:text-blue-400 hover:cursor-pointer" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a onClick={deleteNotifications}>Delete all notifications</a>
              </li>
            </ul>
          </div>
        </div>
        {isLoading && (
          <div className="flex justify-center h-full items-center">
            <LoadingSpinner size="lg" />
          </div>
        )}
        {notifications?.length === 0 && (
          <div className="text-center p-4 font-bold">No notifications 🤔</div>
        )}
        {notifications?.map((notification) => (
          <div className="border-b border-gray-700" key={notification._id}>
            <div className="flex gap-2 p-4">
              {notification.type === "follow" && (
                <FaUser className="w-7 h-7 text-primary" />
              )}
              {notification.type === "like" && (
                <FaHeart className="w-7 h-7 text-red-500" />
              )}
              {notification.type === "comment" && (
                <FaComment className="w-7 h-7 text-gray-500" />
              )}
              <Link to={`/profile/${notification.from.username}`}>
                <div className="avatar">
                  <div className="w-8 rounded-full">
                    <img
                      src={
                        notification.from.profileImg ||
                        "/avatar-placeholder.png"
                      }
                    />
                  </div>
                </div>
                <div className="flex gap-1">
                  <span className="font-bold">
                    @{notification.from.username}
                  </span>{" "}
                  {notification.type === "follow"
                    ? "followed you"
                    : notification.type === "like"
                    ? "liked your post"
                    : notification.type === "comment"
                    ? "commented on your post"
                    : ""}
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default NotificationPage;
