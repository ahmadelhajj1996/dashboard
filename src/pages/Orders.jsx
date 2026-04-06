import Control from "../components/Control";
import Table from "../components/Table";
import { ordercols, orders } from "../utils/columns";

function Orders() {
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
        columns={ordercols}
        data={orders}
        onView={(row) => console.log(row.id)}
        onEdit={handleEdit}
        onDelete={handleDelete}
        rowsPerPage={6}
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

export default Orders;
