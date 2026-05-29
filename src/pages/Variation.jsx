import { useMemo } from "react";
import { useParams } from "react-router-dom";

import { useGet } from "../hooks/useApi";
import useSearch from "../hooks/useSearch";

import Detail from "../components/Detail";
import Table from "../components/Table";
import Imagegallery from "../components/Imagegallery";
import Control from "../components/Control";
import Loading from "../components/Loading";

import { variationattributecols } from "../utils/columns";
import Info from "../components/Info";

function Variation() {
  const { id } = useParams();

  const {
    data = {},
    isFetched,
    isLoading,
  } = useGet(["variations", id], `variations/${id}`, {
    enabled: true,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
    select: (response) => response?.data || {},
  });

const normalized = useMemo(() => {
  if (!data) return null;

  return {
    id: data?.id,
    name: data?.name,

    variations:
      data?.variations?.map((item) => ({
        id: item.id,
        sku: item.sku,

        price: item.final_price ?? item.price,
        base_price: item.price,

        quantity: item.quantity,

        images:
          item.images?.map((img) => ({
            id: img.id,
            path_url: img.path_url,
          })) || [],

        attributes:
          item.attributes?.map((attr) => ({
            id: attr.id,

            attribute_id: String(attr.option?.attribute?.id || ""),
            attribute_name: attr.option?.attribute?.name || "",

            attribute_option_id: String(attr.option?.id || ""),
            attribute_option_name: attr.option?.value || "",

            price_modifier: attr.option?.price_modifier || 0, // 🔥 NEW
          })) || [],

        characteristics:
          item.characteristics?.map((c) => ({
            id: c.id,
            attribute: c.attribute,
          })) || [],
      })) || [],
  };
}, [data]);



  const { search, setSearch, filteredData } = useSearch(
    normalized?.attributes ?? [],
    ["attribute_name", "attribute_option_name"],
  );

  /*
  |--------------------------------------------------------------------------
  | Loading
  |--------------------------------------------------------------------------
  */

  if (isLoading || !isFetched) {
    return <Loading text="Loading variation..." />;
  }

  return (
    <>
      <Info
        title={` الشكل رقم ${normalized?.id} للمنتج "${normalized?.product?.name}" `}
        back={true}
      />

      <Control
        searchable={true}
        isPlus={false}
        search={search}
        setSearch={setSearch}
      />

      <div className="grid grid-cols-2 gap-x-8 p-8">
        {/* LEFT SIDE */}

        <div className="flex flex-col gap-y-3">
          <Detail label="اسم المنتج" value={normalized?.product?.name} />

          <Detail label="الكود" value={`${normalized?.sku ?? "___"}`} />

          <Detail label="السعر" value={`${normalized?.price ?? "___"}`} />

          <Detail label="الكمية" value={`${normalized?.quantity ?? "___"}`} />
            <div className=" mt-4">
           { normalized?.characteristics?.length > 0 &&  <span className=" text-sm"> الخواص  : </span>}
            <ul className="list-disc px-8 space-y-1 text-xs pt-4 ">
              {normalized?.characteristics?.length > 0 ? (
                normalized.characteristics.map((item) => (
                  <li key={item.id}>{item.attribute}</li>
                ))
              ) : (
                <li>لا يوجد خصائص</li>
              )}
            </ul>

            <Table
              columns={variationattributecols}
              data={filteredData}
              rowsPerPage={8}
              showPagination={true}
              paginationPosition="bottom"
              actions={{
                showView: false,
              }}
            />
          </div>
        </div>

        <div>
          <Imagegallery images={normalized?.images ?? []} />
        </div>
      </div>
    </>
  );
}

export default Variation;
