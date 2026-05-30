import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import Control from "../components/Control";
import Table from "../components/Table";

import { ordercols } from "../utils/columns";
import useSearch from "../hooks/useSearch";
import Info from "../components/Info";
import { useOrders } from "../hooks/useData";

function Orders() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const clientId = searchParams.get("client_id");

  const { data, isFetched } = useOrders(clientId ?? null);


  const normalized = useMemo(() => {
    if (!data) return [];

    return data.map((item) => ({
      id: item?.id,
      order_number: item?.order_number,

      name: item?.client?.name || "",
      phone: item?.client?.phone || "",

      status: item?.status,
      grand_total: item?.grand_total,
    }));
  }, [data]);

  const { search, setSearch, filteredData } = useSearch(normalized, [
    "order_number",
    "name",
    "phone",
    "status",
  ]);

  return (
    <>
      <Info title={`  صفحة الطلبات `} />

      <Control
        isPlus={false}
        searchable={true}
        search={search}
        setSearch={setSearch}
      />
      {isFetched && (
        <Table
          columns={ordercols}
          data={filteredData}
          onView={(row) => navigate(`/orders/${row.id}`)}
          rowsPerPage={9}
          showPagination={true}
          paginationPosition="bottom"
          actions={{
            showView: true,
          }}
        />
      )}
    </>
  );
}

export default Orders;
