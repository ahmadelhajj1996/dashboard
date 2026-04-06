
import Control from "../components/Control";
import Table from "../components/Table";
import { productcols, products } from "../utils/columns";

function Products() {
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
        columns={productcols}
        data={products}
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

export default Products;
