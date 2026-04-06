import Control from "../components/Control";
import Table from "../components/Table";
import { usercols, users } from "../utils/columns";

function Users() {

  const handleEdit = () => {
    console.log("Edit product:");
  };

  const handleDelete = () => {
    console.log("Edit product:");
  };

  return (
    <>
      <Control />
      <Table
        columns={usercols}
        data={users}
        onView={(row) => console.log(row.id)}
        onEdit={handleEdit}
        onDelete={handleDelete}
        rowsPerPage={8}
        showPagination={true}
        paginationPosition="bottom"
        actions={{
          showView: true,
          showEdit: true,
          showDelete: true,
        }}
      />
    </>
  );
}

export default Users;

