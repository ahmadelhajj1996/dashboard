import { useNavigate } from "react-router-dom";
import Control from "../components/Control";
import Table from "../components/Table";
import { categorycols, categories } from "../utils/columns";

function Categories() {
  const navigate = useNavigate();

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
        columns={categorycols}
        data={categories}
        onView={(row) => navigate(`/categories/${row.id}`)}
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

export default Categories;
