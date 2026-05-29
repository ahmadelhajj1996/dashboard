import { useNavigate } from "react-router-dom";

import Control from "../components/Control";
import Table from "../components/Table";
import Loading from "../components/Loading";
import Delete from "../components/Delete";

import { usercols } from "../utils/columns";

import { useGet } from "../hooks/useApi";
import useDel from "../hooks/useDelete";
import useSearch from "../hooks/useSearch";
import Info from "../components/Info";

function Users() {
  const navigate = useNavigate();

  /*
  |--------------------------------------------------------------------------
  | Clients
  |--------------------------------------------------------------------------
  */

  const {
    data = [],
    isFetched,
    isLoading,
  } = useGet(["clients"], "clients", {
    staleTime: Infinity,
    select: (response) => response?.data?.data || [],
  });

  /*
  |--------------------------------------------------------------------------
  | Search
  |--------------------------------------------------------------------------
  */

  const { search, setSearch, filteredData } = useSearch(data, [
    "name",
    "email",
    "phone",
  ]);

  /*
  |--------------------------------------------------------------------------
  | Orders (optional logic preserved)
  |--------------------------------------------------------------------------
  */


  /*
  |--------------------------------------------------------------------------
  | Delete
  |--------------------------------------------------------------------------
  */

  const { deleteOpen, itemName, openDelete, closeDelete, confirmDelete } =
    useDel((item) => {
      console.log(item);
    });


  if (!isFetched || isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Info title={`  المستخدمين `} />

      <Control
        isPlus={false}
        searchable={true}
        search={search}
        setSearch={setSearch}
      />
      <div className="w-1/2">
        <Table
          columns={usercols(navigate)}
          data={filteredData}
          onDelete={(item) => openDelete(item, item.name)}
          rowsPerPage={8}
          showPagination={true}
          paginationPosition="bottom"
          // actions={{
          //   showDelete: true,
          // }}
        />
      </div>

      {/* DELETE */}
      <Delete
        isOpen={deleteOpen}
        itemName={itemName}
        onClose={closeDelete}
        onConfirm={confirmDelete}
      />
    </>
  );
}

export default Users;
