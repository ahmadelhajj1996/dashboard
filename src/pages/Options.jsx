import Control from "../components/Control";
import Table from "../components/Table";
import { optioncols, options } from "../utils/columns";

function Options() {
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
        columns={optioncols}
        data={options}
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

export default Options;