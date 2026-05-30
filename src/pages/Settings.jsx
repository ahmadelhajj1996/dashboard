import Exchangerate from "../components/Exchangerate";
import { usePost } from "../hooks/useApi";
import notify from "../utils/toastr";

function Settings() {

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

  return (
    <>
      <div className="grid grid-col gap-y-8">
        <Exchangerate fun={() => console.log("done")} />

        <button
          onClick={update}
          disabled={addItem.isPending}
          className="button w-[365px] rounded-none text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {addItem.isPending ? "جاري تحديث الأسعار..." : "تحديث الأسعار"}
        </button>
      </div>
    </>
  );
}

export default Settings;
