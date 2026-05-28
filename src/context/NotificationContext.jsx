import PropTypes from "prop-types";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { useSelector } from "react-redux";

import api from "../utils/axios";

import { createEcho } from "../utils/echo";

import notify from "../utils/toastr";

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const { admin, token } = useSelector((state) => state.auth);

  const adminId = admin?.id;

  const [notifications, setNotifications] = useState([]);

  const [loading, setLoading] = useState(true);

  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = async () => {
    try {

      const res = await api.get("admin/notifications");

      const data = res.data.data || [];

      setNotifications(data);

      setUnreadCount(data.filter((item) => !item.read_at).length);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!adminId || !token) {
      return;
    }

    fetchNotifications();

    const echo = createEcho(token);

    const channelName = `App.Models.Admin.${adminId}`;

    const channel = echo.private(channelName);

    channel.notification((notification) => {
      console.log("NEW NOTIFICATION", notification);

      const newNotification = {
        id: crypto.randomUUID(),

        data: notification,

        read_at: null,

        created_at: new Date().toISOString(),
      };

      setNotifications((prev) => [newNotification, ...prev]);

      setUnreadCount((prev) => prev + 1);

      notify(notification.title, "info");
    });

    return () => {
      echo.leave(channelName);
    };
  }, [adminId, token]);

  const markAllAsRead = async () => {
    try {
      await api.post("admin/notifications/read");

      setNotifications((prev) =>
        prev.map((item) => ({
          ...item,
          read_at: true,
        })),
      );

      setUnreadCount(0);
    } catch (error) {
      console.error(error);
    }
  };

  const value = useMemo(() => {
    return {
      notifications,
      loading,
      unreadCount,
      markAllAsRead,
      fetchNotifications,
    };
  }, [notifications, loading, unreadCount]);

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotifications must be used inside NotificationProvider",
    );
  }

  return context;
}

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};


  




