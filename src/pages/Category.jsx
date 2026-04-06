
import Control from "../components/Control";
import Table from "../components/Table";
import { subcategorycols, subcategories } from "../utils/columns";
function Category() {


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
        columns={subcategorycols}
        data={subcategories}
        onEdit={handleEdit}
        onDelete={handleDelete}
        rowsPerPage={5}
        showPagination={true}
        paginationPosition="bottom"
        actions={{
          showView: true,
          showEdit: false,
          showDelete: false,
        }}
      />

      
    </>
  );
}


export default Category
