import { Plus, Search } from "lucide-react";

function Control() {
  return (
    <>
      <div className=" px-8 flex justify-between">
        <div className=" flex gap-x-8">
          <div className="  border  w-[400px] flex gap-x-3 p-2 rounded ">
            <Search />
            <input
              type="text"
              className="w-full focus:outline-none focus:ring-0"
              placeholder="ابحث هنا"
            />
          </div>
          <div className=" border p-2 w-[300px]">Filtering</div>
        </div>
        <Plus className=" border p-2 rounded" size={32} />
      </div>
    </>
  );
}

export default Control;
