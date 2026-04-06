import Control from "../components/Control";
import Table from "../components/Table";
import { attributecols, attributes } from "../utils/columns";

function Attributes() {
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
        columns={attributecols}
        data={attributes}
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

export default Attributes;
