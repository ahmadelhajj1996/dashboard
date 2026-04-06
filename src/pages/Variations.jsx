import Control from "../components/Control";
import Table from "../components/Table";
import { variationcols, variations } from "../utils/columns";

function Variations() {
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
        columns={variationcols}
        data={variations}
        onEdit={handleEdit}
        onDelete={handleDelete}
        rowsPerPage={5}
        showPagination={true}
        paginationPosition="bottom"
        actions={{
          showView: false,
          showEdit: true,
          showDelete: true,
        }}
      />
    </>
  );
}

export default Variations   ;