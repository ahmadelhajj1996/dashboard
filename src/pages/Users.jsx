import { useNavigate } from "react-router-dom";

import Control from "../components/Control";
import Table from "../components/Table";
import Delete from "../components/Delete";

import { usercols } from "../utils/columns";

import useDel from "../hooks/useDelete";
import useSearch from "../hooks/useSearch";
import Info from "../components/Info";
import { useUsers } from "../hooks/useData";

function Users() {
  const navigate = useNavigate();

  const { data = [], isFetched } = useUsers();
 
   

  const { search, setSearch, filteredData } = useSearch(data, [
    "name",
    "email",
    "phone",
  ]);

  const { deleteOpen, itemName, openDelete, closeDelete, confirmDelete } =
    useDel((item) => {
      console.log(item);
    });

  return (
    <>
      <Info title={`  المستخدمين `} />

      <Control
        isPlus={false}
        searchable={true}
        search={search}
        setSearch={setSearch}
      />
      {isFetched && (
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
      )}

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
