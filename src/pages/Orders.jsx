import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import Control from "../components/Control";
import Table from "../components/Table";
import Loading from "../components/Loading";

import { ordercols } from "../utils/columns";
import { useGet } from "../hooks/useApi";
import useSearch from "../hooks/useSearch";
import Info from "../components/Info";

function Orders() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const clientId = searchParams.get("client_id");

  /*
  |--------------------------------------------------------------------------
  | API URL
  |--------------------------------------------------------------------------
  */

  const url = clientId
    ? `orders?client_id=${clientId}`
    : "orders";

  /*
  |--------------------------------------------------------------------------
  | Fetch Orders
  |--------------------------------------------------------------------------
  */

  const {
    data = [],
    isFetched,
    isLoading,
  } = useGet(["orders", clientId], url, {
    staleTime: Infinity,
    select: (response) =>
      response?.data?.data || [],
  });

  /*
  |--------------------------------------------------------------------------
  | Normalize Data
  |--------------------------------------------------------------------------
  */

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

  /*
  |--------------------------------------------------------------------------
  | Search
  |--------------------------------------------------------------------------
  */

  const {
    search,
    setSearch,
    filteredData,
  } = useSearch(normalized, [
    "order_number",
    "name",
    "phone",
    "status",
  ]);

  /*
  |--------------------------------------------------------------------------
  | Loading
  |--------------------------------------------------------------------------
  */

  if (!isFetched || isLoading) {
    return <Loading  />;
  }

  return (
    <>

       <Info title={`  صفحة الطلبات `} />
    
      <Control
        isPlus={false}
        searchable={true}
        search={search}
        setSearch={setSearch}
      />

        <Table
          columns={ordercols}
          data={filteredData}
          onView={(row) =>
            navigate(`/orders/${row.id}`)
          }
          rowsPerPage={9}
          showPagination={true}
          paginationPosition="bottom"
          actions={{
            showView: true,
          }}
        />
    </>
  );
}

export default Orders;