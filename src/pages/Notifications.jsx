import { useMemo } from "react";

import Info from "../components/Info";
import Table from "../components/Table";
import Tabs from "../components/Tabs";

import { useNotifications } from "../context/NotificationContext";
import { useTab } from "../hooks/useTab";

import { notificationcols } from "../utils/columns";
import Loading from "../components/Loading";

function Notifications() {
  const { notifications, loading } = useNotifications();

  const { currentTab, setTab } = useTab("new_order");

  const tabs = [
    {
      key: "new_order",
      label: "الطلبات الجديدة",
    },

    {
      key: "quantity_warning",
      label: "الكميات المتبقية",
    },

    {
      key: "exchange_change",
      label: "سعر الصرف",
    },
  ];

  /*
  |--------------------------------------------------------------------------
  | Filter notifications
  |--------------------------------------------------------------------------
  */

  const data = useMemo(() => {
    if (loading) return [];

    return (notifications ?? [])
      .filter((item) => {
        const code = item.data.code;

        if (currentTab === "quantity_warning") {
          return (
            code === "quantity_warning" || code === "critical_quantity_warning"
          );
        }

        if (currentTab === "exchange_change") {
          return (
            code === "exchange_change" ||
            code === "exchange_warning" ||
            code === "critical_exchange_warning"
          );
        }

        return code === currentTab;
      })
      .map((item) => ({
        ...item.data,

        notification_type: item.type,
      }));
  }, [notifications, loading, currentTab]);

  /*
  |--------------------------------------------------------------------------
  | Format rows
  |--------------------------------------------------------------------------
  */

  const formattedData = useMemo(() => {
    return (data ?? []).map((row) => {
      const code = row.code;

      let result = "normal";

      if (code === "exchange_warning" || code === "quantity_warning") {
        result = "warning";
      }

      if (
        code === "critical_exchange_warning" ||
        code === "critical_quantity_warning"
      ) {
        result = "critical";
      }

      return {
        ...row,
        result,
      };
    });
  }, [data]);

  const columns = useMemo(() => {
    return notificationcols(currentTab === "exchange_change");
  }, [currentTab]);

    if (loading) {
      return <Loading />;
    }

  return (
    <>
 
      <Info title="الإشعارات" />

      <Tabs tabs={tabs} currentTab={currentTab} onChange={setTab} />

      <Table
        columns={columns}
        data={formattedData}
        rowsPerPage={12}
        showPagination
        paginationPosition="bottom"
      />
    </>
  );
}

export default Notifications;
