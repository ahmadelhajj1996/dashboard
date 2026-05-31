import { useParams } from "react-router-dom";
import { useAttributes, useVariations } from "../hooks/useData";
import { useEffect, useMemo } from "react";
import usePersisted from "../hooks/usePersisted";
import { useModal } from "../hooks/useModal";
import { useDelete, usePost } from "../hooks/useApi";
import notify from "../utils/toastr";
import { useForm } from "../hooks/useForm";
import { variationSchema } from "../utils/validator";
import useDel from "../hooks/useDelete";
import Info from "../components/Info";
import Control from "../components/Control";
import { Pencil, Plus, Trash2 } from "lucide-react";
import Modal from "../components/Modal";
import { FieldArray, Form, Formik } from "formik";
import FormikInput from "../components/Formikinput";
import FormikSelect from "../components/Formikselect";
import { AttributeOptionSelect } from "../components/Loadoptions";
import Formikimagem from "../components/Formikimagem";
import Delete from "../components/Delete";
import Imagegallery from "../components/Imagegallery";
import Exchangerate from "../components/Exchangerate";

function Product() {
  const { id } = useParams();

  const { data = [], refetch } = useVariations(id);

  const { data: attributes = [] } = useAttributes();

  const attributesoptions = useMemo(() => {
    if (!attributes) return [];
    return (
      attributes?.map(({ id, name }) => ({
        label: name,
        value: String(id),
      })) || []
    );
  }, [attributes]);

  const normalized = useMemo(() => {
    if (!data) return [];

    return (
      data?.map((item) => ({
        id: item.id,

        name: item.product.name,

        sku: item.sku,

        sell_price: item.sell_price,
        base_price: item.base_price,
        sell_rate: item.sell_rate,

        buy_price: item.buy_price,
        base_buy_price: item.base_buy_price,
        buy_rate: item.buy_rate,

        final_price: item.final_price,

        quantity: item.quantity,

        images:
          item.images?.map((img) => ({
            id: img.id,
            path_url: img.path_url,
            existing: true,
          })) || [],

        attributes:
          item.attributes?.map((attr) => ({
            id: attr.id,

            attribute_id: attr.option?.attribute?.id
              ? String(attr.option.attribute.id)
              : "",

            attribute_name: attr.option?.attribute?.name || "",

            attribute_option_id: attr.option?.id ? String(attr.option.id) : "",

            attribute_option_name: attr.option?.value || "",

            price_override: attr.price_override,
          })) || [],

        characteristics:
          item.characteristics?.map((c) => ({
            id: c.id,
            attribute: c.attribute,
          })) || [],
      })) || []
    );
  }, [data]);

  const [currentid, setCurrentid] = usePersisted("currentid", null);

  const current = useMemo(() => {
    if (!normalized?.length) return null;

    return normalized.find((item) => item.id === currentid) || normalized[0];
  }, [normalized, currentid]);

  useEffect(() => {
    if (!normalized?.length) return;

    if (!currentid) {
      setCurrentid(normalized[0].id);
    }
  }, [normalized, currentid, setCurrentid]);

  const attributesGrouped = [
    ...new Set(current?.attributes?.map((item) => item.attribute_name) || []),
  ]
    .filter((name) => name !== "اللون")

    .map((attributeName) => {
      const attributeValuesSet = [
        ...new Set(
          current?.attributes
            ?.filter((item) => item.attribute_name === attributeName)
            ?.map((item) => item.attribute_option_name) || [],
        ),
      ];

      return {
        attributeName,
        attributeValuesSet,
      };
    });

  const { isOpen, modalData, modalMode, openModal, closeModal } = useModal();

  const addVariation = usePost({
    invalidateQueries: [["variations"], ["products", id]],
    onSuccess: async () => {
      await refetch();
      notify("تمت العملية بنجاح ", "success");
    },

    onError: () => {
      notify("هناك خطأ ما ", "error");
    },
  });

  const deleteVariation = useDelete({
    invalidateQueries: [["variations"], ["products", id]],
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
        product_id: id,

        sku: modalData.sku || "",
        base_price: modalData.base_price || "",
        base_buy_price: modalData.base_buy_price || "",
        quantity: modalData.quantity || "",

        images:
          modalData?.images?.map((img) => ({
            id: img.id,
            path_url: img.path_url,
            existing: true,
          })) || [],

        attributes:
          modalData.attributes?.length > 0
            ? modalData.attributes
            : [
                {
                  attribute_id: "",
                  attribute_option_id: "",
                  price_override: "",
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
      product_id: id,
      sku: "",
      base_price: "",
      base_buy_price: "",
      quantity: "",

      images: [],

      attributes: [
        {
          attribute_id: "",
          attribute_option_id: "",
          price_override: "",
        },
      ],
      characteristics: [
        {
          attribute: "",
          attribute_option_id: "",
        },
      ],
    };
  }, [modalMode, modalData, id]);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const formData = new FormData();

      formData.append("product_id", values.product_id);
      formData.append("sku", values.sku);
      formData.append("base_price", values.base_price);
      formData.append("base_buy_price", values.base_buy_price);

      formData.append("quantity", values.quantity);

      formData.append("attributes_count", values.attributes.length);

      if (values.attributes && values.attributes.length > 0) {
        const cleanedAttributes = values.attributes.filter(
          (a) => a.attribute_id && a.attribute_option_id,
        );
        cleanedAttributes.forEach((attribute, index) => {
          formData.append(
            `attributes[${index}][attribute_id]`,
            attribute.attribute_id,
          );
          formData.append(
            `attributes[${index}][attribute_option_id]`,
            attribute.attribute_option_id,
          );
          
          formData.append(
            `attributes[${index}][price_override]`,
            attribute.price_override || null,
          );
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
      console.log(formData);

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

  const { formikProps, handleConfirm } = useForm({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: variationSchema,
  });

  const { deleteOpen, itemName, closeDelete, openDelete, confirmDelete } =
    useDel(async (item) => {
      await deleteVariation.mutateAsync({
        url: `/variations/${item.id}`,
      });

      closeDelete();
    });

  console.log("", current);

  // if (current) {
  return (
    <>
      {current && (
        <Info
          title={` أشكال وصفات المنتج  ${current?.name} ( ${normalized?.length} )  `}
          back={true}
        />
      )}

      <Control
        onClick={() => openModal("add")}
        searchable={false}
        children2={
          current ? (
            <div className="flex w-full justify-start gap-x-4 text-end">
              <div className="bordered p-2 rounded transition-none animate-none">
                <Trash2
                  onClick={() =>
                    openDelete(current, ` الشكل رقم ${current?.id}`)
                  }
                  className="text-red-600"
                  size={20}
                />
              </div>

              <div className="bordered p-2 rounded transition-none animate-none">
                <Pencil
                  className="text-blue-600"
                  onClick={() => openModal("edit", current)}
                  size={20}
                />
              </div>
            </div>
          ) : null
        }
      >
        <></>
      </Control>

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title={modalMode === "add" ? "اضافة شكل" : "تعديل الشكل"}
        showFooter
        size="2xl"
        onConfirm={handleConfirm}
        isConfirmLoading={addVariation.isPending}
      >
        <Formik {...formikProps} enableReinitialize>
          {({ values }) => (
            <Form className="space-y-6">
              {/* BASIC INFO */}

              <div className="grid grid-cols-4 gap-4">
                <FormikInput
                  name="sku"
                  label="الكود( يجب ان لا تتكرر القيمة  ) : "
                />

                <FormikInput
                  name="base_buy_price"
                  label="سعر الشراء بالدولار:"
                />

                <FormikInput name="base_price" label="سعر البيع بالدولار:" />

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
                            price_override: "",
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
                            attributesdata={attributes}
                          />

                          {/* <FormikInput
                            name={`attributes.${index}.price_override`}
                            type="number"
                            label="سعر خاص للصفة؟"
                          /> */}

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
                label="  صور الشكل ( يحب اضافة صورة على الاقل  )"
                chooseText="اختر الصور"
                emptyText="لا توجد صور"
                maxFiles={10}
              />
            </Form>
          )}
        </Formik>
      </Modal>

      <Delete
        isOpen={deleteOpen}
        itemName={itemName}
        onClose={closeDelete}
        onConfirm={confirmDelete}
      />
      {current && (
        <div className="grid grid-cols-3 gap-x-16 py-4">
          <Imagegallery
            images={current?.images ?? []}
            variations={
              normalized?.map((item) => ({
                id: item.id,
                path_url: item.images?.[0]?.path_url || null,
              })) || []
            }
            onClick={(item) => setCurrentid(item.id)}
          />

          <div className=" flex flex-col text-sm gap-y-5">
            <span> الرمز : {current?.sku ?? 0} </span>

            <span>
              سعر الشراء : {current?.base_buy_price ?? 0}$ ={" "}
              {current?.buy_price ?? 0} ل.س{" "}
            </span>

            <span>
              سعر البيع : {current?.base_price ?? 0}$ ={" "}
              {current?.sell_price ?? 0} ل.س{" "}
            </span>

            <div className="flex gap-x-2 items-center">
              <span>الكمية المتوفرة :</span>
              {current?.quantity < 5 ? (
                <span className="mb-1 text-red-600">
                  باقي فقط {current.quantity}
                </span>
              ) : current?.quantity < 10 ? (
                <span className="mb-1 text-yellow-600">
                  باقي فقط {current.quantity}
                </span>
              ) : (
                <span>{current?.quantity ?? 0}</span>
              )}
            </div>

            <Exchangerate />
            
            {attributesGrouped?.length > 0 && (

            <div className="pt-4 space-y-2 border-t-[1px] border-cyan-600 my-4">
              <span className=" text-cyan-600">الصفات المتوفرة : </span>
              {attributesGrouped.map((group) => (
                <div
                  key={group.attributeName}
                  className=" flex flex-col gap-y-2 "
                >
                  <h3 className=" text-sm ">{group.attributeName}</h3>

                  <div className="flex flex-wrap gap-3">
                    {group.attributeValuesSet.map((option) => {
                      return (
                        <button
                          key={option}
                          type="button"
                          className={`
                            rounded-lg
                            px-4
                            py-2
                            text-xs
                            transition-all
                            duration-200
                            bg-white border-[1px] border-cyan-600 text-cyan-600
                          `}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            )}

            {current?.characteristics?.length > 0 && (
              <div className="pt-4 space-y-2 border-t-[1px] border-cyan-600 my-0">
                <span className=" text-cyan-600">الخصائص : </span>
                {current?.characteristics?.length > 0 && (
                  <ul className="space-y-2 rounded-lg">
                    {current?.characteristics?.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-center gap-3 text-sm "
                      >
                        <span className="leading-6 ps-2">{item.attribute}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* {current?.characteristics?.length > 0 && (
                <div className=" bordered border-b-0 border-x-0  mt-12">

                </div>
              )} */}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
  // }
}

export default Product;
