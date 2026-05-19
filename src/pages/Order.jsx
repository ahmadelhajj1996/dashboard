import { useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import Table from "../components/Table";
import Detail from "../components/Detail";
import Loading from "../components/Loading";

import { orderitemcols } from "../utils/columns";
import { useGet } from "../hooks/useApi";
import Info from "../components/Info";

function Order() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const client_id = searchParams.get("client_id");

  const endpoint = useMemo(() => {
    if (!id) return null;

    return client_id
      ? `orders/${id}?client_id=${client_id}`
      : `orders/${id}`;
  }, [id, client_id]);

  const {
    data = {},
    isFetched,
    isLoading,
  } = useGet(["orders", id, client_id], endpoint, {
    enabled: !!id,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
    select: (response) => response?.data || {},
  });

  const normalized = useMemo(() => {
    if (!data) return null;

    return {
      id: data?.id,
      order_number: data?.order_number,
      count: data?.items?.length,

      items:
        data?.items?.map((item) => ({
          id: item.id,
          variation_id: item.variation_id,
          quantity: item.quantity,
          unit_price: item.unit_price,
          subtotal: item.subtotal,
        })) || [],
    };
  }, [data, isFetched]);

  console.log(normalized);

  if (!isFetched || isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Info title={`  عناصر الطلب ذو الرقم   " ${data?.order_number} " `} />

      <div className="grid grid-cols-4 gap-y-4 text-sm py-8 px-4">
        <Detail label="تاريخ الطلب" value={data?.created_at} />
        <Detail label="اسم الزبون" value={data?.client?.name} />
        <Detail label="الاجمالي" value={data?.grand_total} />
      </div>

      <Table
        columns={orderitemcols}
        data={normalized?.items ?? []}
        rowsPerPage={5}
        showPagination={true}
        paginationPosition="bottom"
      />
    </>
  );
}

export default Order;