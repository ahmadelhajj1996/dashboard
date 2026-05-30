import { usePost } from "../hooks/useApi";
import { useNotifications } from "../context/NotificationContext";
import PropTypes from "prop-types";

function Exchangerate({ fun }) {
  const { updateExchangeRate, exchangeRate } = useNotifications();

  const addItem = usePost({
    invalidateQueries: ["exchange-rates"],
  });

  const update = async () => {
    const response = await addItem.mutateAsync({
      url: "/exchange-rates/fetch",
    });

    const rateData = response?.data;

    if (rateData) {
      updateExchangeRate(rateData);

      if (typeof fun === "function") {
        fun(rateData);
      }
    }
  };

  return (
    <div className="flex items-center">
      <p className="text-sm bordered border-e-0 px-4 py-2">
        سعر الصرف : {exchangeRate?.rate}
      </p>
      <button
        onClick={update}
        disabled={addItem.isPending}
        className="button w-1/6 bordered rounded-none text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {addItem.isPending ? "....." : "تحديث"}
      </button>
    </div>
  );
}

Exchangerate.propTypes = {
  fun: PropTypes.func,
};

export default Exchangerate;