import { useParams } from "react-router-dom";
import { useGet, usePost, useDelete } from "../hooks/useApi";
import { useEffect, useMemo } from "react";
import usePersisted from "../hooks/usePersisted";
import { Formik, Form, FieldArray } from "formik";
import { Pencil, Plus, Trash2 } from "lucide-react";
import Imagegallery from "../components/Imagegallery";
import Control from "../components/Control";
import Modal from "../components/Modal";
import FormikInput from "../components/Formikinput";
import FormikSelect from "../components/Formikselect";
import Formikimagem from "../components/Formikimagem";
import { AttributeOptionSelect } from "../components/Loadoptions";
import Delete from "../components/Delete";
import notify from "../utils/toastr";
import Info from "../components/Info";
import { useModal } from "../hooks/useModal";
import { useForm } from "../hooks/useForm";
import { variationSchema } from "../utils/validator";
import useDel from "../hooks/useDelete";

function Product() {
  const { id } = useParams();
  const productId = Number(id);

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

  const { data = {}, refetch } = useGet(
    ["products", productId],
    `products/${productId}`,
    {
      enabled: true,
      keepPreviousData: true,
      staleTime: 1000 * 60 * 5,
      select: (res) => res?.data || {},
    },
  );

  const normalized = useMemo(() => {
    if (!data) return null;

    return {
      id: data?.id,
      name: data?.name,

      variations:
        data?.variations?.map((item) => ({
          id: item.id,
          sku: item.sku,
          price: item.price,
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

              attribute_option_id: attr.option?.id
                ? String(attr.option.id)
                : "",

              attribute_option_name: attr.option?.value || "",
            })) || [],

          characteristics:
            item.characteristics?.map((c) => ({
              id: c.id,
              attribute: c.attribute,
            })) || [],
        })) || [],
    };
  }, [data]);

  const [currentid, setCurrentid] = usePersisted("currentid", null);

  const current = useMemo(() => {
    if (!normalized?.variations?.length) return null;

    return (
      normalized.variations.find((v) => v.id === currentid) ||
      normalized.variations[0]
    );
  }, [normalized, currentid]);

  useEffect(() => {
    if (!normalized?.variations?.length) return;

    if (!currentid) {
      setCurrentid(normalized.variations[0].id);
    }
  }, [normalized, currentid, setCurrentid]);

  const variations = useMemo(() => {
    return (
      normalized?.variations?.map((item) => ({
        id: item.id,
        path_url: item?.images?.[0]?.path_url || "",
        attributes: item.attributes,
      })) || []
    );
  }, [normalized]);

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

  return (
    <>

    {
        current &&  <Info title={` أشكال وصفات المنتج "${data?.name}" `} back={true} />
    } 
    
      <Control onClick={() => openModal("add")} searchable={false}>
        {current && (
          <>
            <Pencil
              className=" bordered text-blue-600"
              onClick={() => openModal("edit", current)}
              size={20}
            />
            <Trash2 onClick={() => openDelete(current, ` الشكل رقم ${current?.id}`)} className=" bordered text-red-600 " size={20} />
          </>
        )}
      </Control>

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
                <FormikInput
                  name="sku"
                  label="الكود( يجب ان لا تتكرر القيمة  ) : "
                />

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
        <div className="grid grid-cols-3 gap-x-16 py-2">
          <Imagegallery
            images={current?.images ?? []}
            variations={variations}
            onClick={(item) => setCurrentid(item.id)}
          />

          <div className="col-span-2">
            <div className="price text-sm  flex flex-col  gap-y-6">
              <div className="grid grid-cols-2 gap-y-6">
                <span> اسم المنتج : {normalized?.name}</span>

                <span>الرمز : {current?.sku ?? 0} </span>

                <span>السعر : {current?.price ?? 0} ل.س</span>

                <span>الكمية المتوفرة : {current?.quantity ?? 0} </span>
              </div>

              <div className="mt-6 space-y-6">
                {attributesGrouped.map((group) => (
                  <div key={group.attributeName}>
                    <h3 className="mb-4 price ">{group.attributeName}</h3>

                    <div className="flex flex-wrap gap-3">
                      {group.attributeValuesSet.map((option) => {
                        
                        // const isActive = current?.attributes?.find(
                        //   (attr) =>
                        //     attr.attribute_name === group.attributeName &&
                        //     attr.attribute_option_name === option,
                        // );



                        return (
                          <button
                            key={option}
                            type="button"
                            className={`
                          rounded-lg
                          px-4
                          py-2
                          text-sm
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
            </div>

            {current?.characteristics?.length > 0 && (
              <div className=" bordered border-b-0 border-x-0  mt-12">
                {current?.characteristics?.length > 0 && (
                  <div className="mt-4">
                    <h3 className=" name text-xs sm:text-sm">الخصائص</h3>

                    <ul className="space-y-3 rounded-lg  pt-4">
                      {current?.characteristics?.map((item) => (
                        <li
                          key={item.id}
                          className="
                              flex

                              items-center
                              gap-3
                              text-sm
                              text-gray-700
                            "
                        >
                          <span
                            className="
                              h-1
                              w-1
                              shrink-0
                              rounded-full
                              bg-cyan-500
                            "
                          />

                          <span className="leading-6">{item.attribute}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Product;
