import { useMemo } from "react";

import Table from "../components/Table";
import { useGet, usePost } from "../hooks/useApi";
import { exchangeratescols } from "../utils/columns";
import notify from "../utils/toastr";
import Info from "../components/Info";
import Loading from "../components/Loading";

function Home() {
  const { data, isFetched } = useGet(["exchange-rates"], "exchange-rates", {
    staleTime: Infinity,

    select: (response) => response?.data ?? [],
  });

  const formattedData = useMemo(() => {
    return (data ?? []).map((row) => {
      const rate = Number(row.rate || 0);

      const previousRate = Number(row.previous_rate || 0);

      const changeAmount = rate - previousRate;

      const changePercentage =
        previousRate > 0 ? ((changeAmount / previousRate) * 100).toFixed(2) : 0;

      let result = "stable";

      if (rate < previousRate) {
        result = "up";
      } else if (rate > previousRate) {
        result = "down";
      }

      const absPercentage = Math.abs(Number(changePercentage));

      let notes = "stable";

      if (rate < previousRate) {
        if (absPercentage >= 10) {
          notes = "critical-up";
        } else if (absPercentage >= 5) {
          notes = "warning-up";
        } else {
          notes = "positive-up";
        }
      } else if (rate > previousRate) {
        if (absPercentage >= 10) {
          notes = "critical-down";
        } else if (absPercentage >= 5) {
          notes = "warning-down";
        } else {
          notes = "negative-down";
        }
      }

      return {
        ...row,

        change_amount: changeAmount,

        change_percentage: Number(changePercentage),

        result,

        notes,
      };
    });
  }, [data]);

  const final = useMemo(() => {
    return formattedData[0] || {};
  }, [formattedData]);

  const addItem = usePost({
    invalidateQueries: ["exchange-rates"],

    onSuccess: () => {
      notify("تم تحديث الأسعار", "success");
    },

    onError: () => {
      notify("هناك خطأ ما", "error");
    },
  });

  const update = async () => {
    await addItem.mutateAsync({
      url: "/exchange-rates/update-prices",
    });
  };

  if (!isFetched) {
    return <Loading />;
  }

  return (
    <>
      <div className="mx-8">
        <Info title={` سعر الصرف اليوم : ${final.rate}`} />

        <button
          onClick={update}
          disabled={addItem.isPending}
          className="button w-1/6 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {addItem.isPending ? "جاري تحديث الأسعار..." : "تحديث الأسعار"}
        </button>

      </div>

      <Table
        columns={exchangeratescols}
        data={formattedData}
        rowsPerPage={12}
        showPagination={true}
        paginationPosition="bottom"
      />
    </>
  );
}

export default Home;
