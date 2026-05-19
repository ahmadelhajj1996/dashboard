import { useMemo } from "react";
import { Formik, Form, FieldArray } from "formik";
import { Plus, Trash2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import Control from "../components/Control";
import Table from "../components/Table";
import Modal from "../components/Modal";
import Delete from "../components/Delete";
import Loading from "../components/Loading";

import FormikInput from "../components/FormikInput";
import FormikSelect from "../components/Formikselect";
import Formikimagem from "../components/Formikimagem";

import { AttributeOptionSelect } from "../components/Loadoptions";

import { useGet, usePost, useDelete } from "../hooks/useApi";
import { useModal } from "../hooks/useModal";
import { useForm } from "../hooks/useForm";

import useDel from "../hooks/useDelete";
import useSearch from "../hooks/useSearch";

import { variationcols } from "../utils/columns";
import { variationSchema } from "../utils/validator";
import Info from "../components/Info";
import notify from "../utils/toastr";

function Product() {
  const { id } = useParams();
  const navigate = useNavigate();

  const productId = useMemo(() => Number(id), [id]);

  /*
  |--------------------------------------------------------------------------
  | Product
  |--------------------------------------------------------------------------
  */

  const { data: product = {}, isFetched: productFetched } = useGet(
    ["products", productId],
    `products/${productId}`,
    {
      enabled: !!productId,
      keepPreviousData: true,
      staleTime: 1000 * 60 * 5,
      select: (response) => response?.data || {},
    },
  );

  /*
  |--------------------------------------------------------------------------
  | Variations
  |--------------------------------------------------------------------------
  */

  const { data: variations = [], isFetched: variationsFetched , refetch } = useGet(
    ["variations", productId],
    `variations?product_id=${productId}`,
    {
      enabled: !!productId,
      select: (res) => res?.data?.data || [],
    },
  );

  /*
  |--------------------------------------------------------------------------
  | Normalize
  |--------------------------------------------------------------------------
  */

  const normalized = useMemo(() => {
    if (!variationsFetched) return [];

    return variations.map((v) => ({
      id: v.id,
      sku: v.sku,
      price: v.price,
      quantity: v.quantity,

      image_url: v.images?.[0]?.path_url || v.image_url || "",

      images:
        v.images?.map((img) => ({
          id: img.id,
          preview: img.path_url,
          existing: true,
        })) || [],

      attributes:
        v.attributes?.map((item) => ({
          attribute_id: item.option?.attribute?.id
            ? String(item.option.attribute.id)
            : "",

          attribute_option_id: item.option?.id ? String(item.option.id) : "",
        })) || [],

      characteristics:
        v.characteristics?.map((item) => ({
          id: item.id,
          attribute: item.attribute,
        })) || [],
    }));
  }, [variations, variationsFetched]);

  console.log(normalized[0] ?? null);

  /*
  |--------------------------------------------------------------------------
  | Search
  |--------------------------------------------------------------------------
  */

  const { search, setSearch, filteredData } = useSearch(normalized ?? [], [
    "sku",
    "price",
    "quantity",
  ]);

  /*
  |--------------------------------------------------------------------------
  | Attributes
  |--------------------------------------------------------------------------
  */

  const { data: attributesdata = [] } = useGet(["attributes"], "attributes", {
    staleTime: Infinity,
    select: (response) => response?.data?.data || [],
  });

  const attributesoptions = useMemo(() => {
    return (
      attributesdata?.map(({ id, name }) => ({
        label: name,
        value: String(id),
      })) || []
    );
  }, [attributesdata]);

  /*
  |--------------------------------------------------------------------------
  | Modal
  |--------------------------------------------------------------------------
  */

  const { isOpen, modalData, modalMode, openModal, closeModal } = useModal();

  /*
  |--------------------------------------------------------------------------
  | Mutations
  |--------------------------------------------------------------------------
  */
  
  const addVariation = usePost({
    invalidateQueries: ["variations"],
    onSuccess: async () => {
      await refetch();
      notify("تمت العملية بنجاح ", "success");
    },

    onError: () => {
      notify("هناك خطأ ما ", "error");
    },
  });

  const deleteVariation = useDelete({
    invalidateQueries: ["variations"],
        onSuccess: async () => {
      await refetch();
      notify("تمت العملية بنجاح ", "success");
    },

    onError: () => {
      notify("هناك خطأ ما ", "error");
    },

  });

  const initialValues = useMemo(() => {
    if (modalMode === "edit" && modalData) {
      return {
        product_id: productId,

        sku: modalData.sku || "",
        price: modalData.price || "",
        quantity: modalData.quantity || "",

        images: modalData.images?.length > 0 ? modalData.images : [],

        attributes:
          modalData.attributes?.length > 0
            ? modalData.attributes
            : [
                {
                  attribute_id: "",
                  attribute_option_id: "",
                },
              ],
        characteristics:
          modalData.characteristics?.length > 0
            ? modalData.characteristics
            : [
                {
                  attribute: "",
                },
              ],
      };
    }

    return {
      product_id: productId,
      sku: "",
      price: "",
      quantity: "",

      images: [],

      attributes: [
        {
          attribute_id: "",
          attribute_option_id: "",
        },
      ],
      characteristics: [
        {
          attribute: "",
          attribute_option_id: "",
        },
      ],
    };
  }, [modalMode, modalData, productId]);

  /*
  |--------------------------------------------------------------------------
  | Submit
  |--------------------------------------------------------------------------
  */

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const formData = new FormData();

      formData.append("product_id", values.product_id);
      formData.append("sku", values.sku);
      formData.append("price", values.price);
      formData.append("quantity", values.quantity);

      formData.append("attributes_count", values.attributes.length);

      if (values.attributes && values.attributes.length > 0) {
        values.attributes.forEach((attribute, index) => {
          if (attribute.attribute_id && attribute.attribute_option_id) {
            formData.append(
              `attributes[${index}][attribute_id]`,
              attribute.attribute_id,
            );

            formData.append(
              `attributes[${index}][attribute_option_id]`,
              attribute.attribute_option_id,
            );
          }
        });
      }

      if (values.characteristics?.length > 0) {
        values.characteristics.forEach((item, index) => {
          if (item.attribute) {
            formData.append(
              `characteristics[${index}][attribute]`,
              item.attribute,
            );
          }
        });
      }

      const existingIdsInForm = [];
      const newImages = [];

      values.images.forEach((item) => {
        if (item?.existing) {
          existingIdsInForm.push(item.id);
        } else {
          newImages.push(item);
        }
      });

      /*
      |--------------------------------------------------------------------------
      | Deleted Images
      |--------------------------------------------------------------------------
      */

      if (modalMode === "edit") {
        const originalIds = modalData.images.map((img) => img.id);

        const deletedImages = originalIds.filter(
          (id) => !existingIdsInForm.includes(id),
        );

        deletedImages.forEach((id) => {
          formData.append("deleted_images[]", id);
        });
      }

      /*
      |--------------------------------------------------------------------------
      | New Images
      |--------------------------------------------------------------------------
      */

      newImages.forEach((item) => {
        if (item?.file instanceof File) {
          formData.append("images[]", item.file);
        }
      });

      /*
      |--------------------------------------------------------------------------
      | Request
      |--------------------------------------------------------------------------
      */

      let request;

      if (modalMode === "add") {
        request = addVariation.mutateAsync({
          url: "/variations",
          data: formData,
        });
      } else {
        formData.append("_method", "PUT");

        request = addVariation.mutateAsync({
          url: `/variations/${modalData.id}`,
          data: formData,
        });
      }

      await request;

      resetForm();
      closeModal();
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Form
  |--------------------------------------------------------------------------
  */

  const { formikProps, handleConfirm } = useForm({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: variationSchema,
  });

  /*
  |--------------------------------------------------------------------------
  | Delete
  |--------------------------------------------------------------------------
  */

  const { deleteOpen, itemName, openDelete, closeDelete, confirmDelete } =
    useDel(async (item) => {
      await deleteVariation.mutateAsync({
        url: `/variations/${item.id}`,
      });

      closeDelete();
    });

  /*
  |--------------------------------------------------------------------------
  | Loading
  |--------------------------------------------------------------------------
  */

  if (!productFetched || !variationsFetched) {
    return <Loading />;
  }

  return (
    <>
      <Info
        title={` أشكال وصفات المنتج "${product?.name}" `}
        back={true}
      />

      <Control
        searchable={true}
        isPlus={true}
        search={search}
        setSearch={setSearch}
        onClick={() => openModal("add")}
      >
      </Control>

      {/* TABLE */}

      <Table
        columns={variationcols}
        data={filteredData}
        rowsPerPage={5}
        onView={(row) => navigate(`/products/variations/${row.id}`)}
        onEdit={(item) => openModal("edit", item)}
        onDelete={(item) => openDelete(item, item.sku)}
      />

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title={modalMode === "add" ? "اضافة شكل" : "تعديل الشكل"}
        showFooter
        size="2xl"
        onConfirm={handleConfirm}
      >
        <Formik {...formikProps} enableReinitialize>
          {({ values }) => (
            <Form className="space-y-6">
              {/* BASIC INFO */}

              <div className="grid grid-cols-3 gap-4">
                <FormikInput name="sku" label="الكود:" />

                <FormikInput name="price" label="السعر:" />

                <FormikInput name="quantity" label="الكمية المتوفرة:" />
              </div>

              {/* ATTRIBUTES */}

              <FieldArray name="attributes">
                {({ push, remove }) => (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="label">الاشكال المتوفرة</h2>

                      <Plus
                        size={32}
                        onClick={() =>
                          push({
                            attribute_id: "",
                            attribute_option_id: "",
                          })
                        }
                        className="border p-2 rounded"
                      />
                    </div>

                    {values.attributes?.map((item, index) => (
                      <div key={index}>
                        <div className="grid grid-cols-[1fr_1fr_auto] items-center gap-4">
                          <FormikSelect
                            name={`attributes.${index}.attribute_id`}
                            label="اختر الصفة"
                            options={attributesoptions}
                          />

                          <AttributeOptionSelect
                            index={index}
                            attributeId={item.attribute_id}
                            attributesdata={attributesdata}
                          />

                          <Trash2
                            size={24}
                            className="mt-6"
                            color="red"
                            onClick={() => remove(index)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </FieldArray>

              {/* characteristics */}
              <FieldArray name="characteristics">
                {({ push, remove }) => (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="label">الخصائص</h2>

                      <Plus
                        size={32}
                        onClick={() =>
                          push({
                            attribute: "",
                          })
                        }
                        className="border p-2 rounded"
                      />
                    </div>

                    {values.characteristics?.map((item, index) => (
                      <div key={index}>
                        <div className="flex flex-1 items-center gap-4">
                          <FormikInput
                            name={`characteristics.${index}.attribute`}
                            label="الخاصة"
                          />
                          <Trash2
                            size={24}
                            className="mt-6"
                            color="red"
                            onClick={() => remove(index)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </FieldArray>

              {/* IMAGES */}

              <Formikimagem
                name="images"
                label="صور الشكل"
                chooseText="اختر الصور"
                emptyText="لا توجد صور"
                maxFiles={10}
              />
            </Form>
          )}
        </Formik>
      </Modal>

      {/* DELETE */}

      <Delete
        isOpen={deleteOpen}
        itemName={itemName}
        onClose={closeDelete}
        onConfirm={confirmDelete}
      />
    </>
  );
}

export default Product;
