import { useEffect, useMemo, useCallback, useRef } from "react";
import Imagegallery from "../components/Imagegallery";
import { useAttributes, useVariations } from "../hooks/useData";
import Control from "../components/Control";
import { Pencil, Plus, Trash2 } from "lucide-react";
import useDel from "../hooks/useDelete";
import { useModal } from "../hooks/useModal";
import Modal from "../components/Modal";
import { FieldArray, Form, Formik, useFormikContext } from "formik";
import FormikSelect from "../components/Formikselect";
import Formikimagem from "../components/Formikimagem";
import FormikInput from "../components/Formikinput";
import { useForm } from "../hooks/useForm";
import notify from "../utils/toastr";
import { useDelete, usePost } from "../hooks/useApi";
import Delete from "../components/Delete";
import usePersisted from "../hooks/usePersisted";

function ChildAttributeFormSync({ attributes, modalMode, originalGroupData }) {
  const { values, setFieldValue } = useFormikContext();
  const previousSelection = useRef(values.child_attribute);

  useEffect(() => {
    const currentSelection = values.child_attribute;

    // 1. If no attribute is selected, or it hasn't actually changed, do nothing.
    if (!currentSelection || currentSelection === previousSelection.current) {
      return;
    }

    const targetAttribute = attributes.find(
      (attr) => String(attr.id) === String(currentSelection),
    );

    if (targetAttribute?.options?.length) {
      // Extract original backend database variations if they exist
      const originalItems = originalGroupData?.items || [];

      // 2. Map new options but prioritize preserving original database records over dirty state records
      const builtVariations = targetAttribute.options.map((opt) => {
        // Always look into the TRUE original backend items first to preserve database tracking (IDs, SKUs, etc.)
        const originalVariation = originalItems.find((variation) => {
          const variationAttr = variation.special_attributes?.[0];
          return (
            variationAttr &&
            String(variationAttr.attribute_id) === String(currentSelection) &&
            String(variationAttr.option_id) === String(opt.id)
          );
        });

        if (originalVariation) {
          return {
            id: originalVariation.id,
            sku: originalVariation.sku || "",
            base_price: originalVariation.base_price || "",
            base_buy_price: originalVariation.base_buy_price || "",
            quantity: originalVariation.quantity ?? "",
            characteristics: originalVariation.characteristics,
            attribute: String(currentSelection),
            option: String(opt.id),
          };
        }

        // Fallback: If not in original database data, check current dirty form values
        const existingFormVariation = values.variations?.find(
          (v) =>
            String(v.option) === String(opt.id) &&
            String(v.attribute) === String(currentSelection),
        );

        if (existingFormVariation) {
          return existingFormVariation;
        }

        // Otherwise, fall back to a clean state for a new option row
        return {
          id: null,
          sku: "",
          base_price: 0,
          base_buy_price: 0,
          quantity: 0,
          attribute: String(currentSelection),
          option: String(opt.id),
        };
      });

      setFieldValue("variations", builtVariations);
    }

    // Keep the tracking ref up to date
    previousSelection.current = currentSelection;
  }, [
    values.child_attribute,
    attributes,
    setFieldValue,
    modalMode,
    originalGroupData,
  ]);

  return null;
}

function Tutorial() {
  
  const id = 1;

  const { data = [], refetch } = useVariations(id);

  const { data: attributes = [] } = useAttributes();

  const [currentGroupKey, setCurrentGroupKey] = usePersisted(
    "currentGroupKey",
    null,
  );

  const [currentVariationId, setCurrentVariationId] = usePersisted(
    "currentVariationId",
    null,
  );

  /**
   * =========================================
   * KEEP CURRENT GROUP VALID
   * =========================================
   */
  useEffect(() => {
    if (!data.length) return;

    setCurrentGroupKey((prev) => {
      const exists = data.some((g) => g.group_key === prev);
      return exists ? prev : data[0].group_key;
    });
  }, [data]);

  const current = useMemo(() => {
    if (!data.length) return null;
    return data.find((g) => g.group_key === currentGroupKey) || data[0];
  }, [data, currentGroupKey]);

  const currentVariation = useMemo(() => {
    if (!current?.items?.length) return null;

    return (
      current.items.find((v) => v.id === currentVariationId) || current.items[0]
    );
  }, [current, currentVariationId]);

  const images = useMemo(() => {
    return current?.images || [];
  }, [current]);

  const variations = useMemo(() => {
    return data?.map((group) => ({
      id: group?.group_key,
      path_url: group?.images?.[0]?.path_url || null,
    }));
  }, [data]);

  const handleVariationClick = useCallback((item) => {
    setCurrentGroupKey(item.id);
    setCurrentVariationId(null);
  }, []);

  /**
   * =========================================
   * BUILD ATTRIBUTE BUTTONS
   * =========================================
   */
  /**
   * =========================================
   * BUILD ATTRIBUTE BUTTONS FROM SPECIAL ATTRIBUTES
   * =========================================
   */
  const variationAttributes = useMemo(() => {
    if (!current?.items?.length) return [];

    const map = new Map();

    current.items.forEach((variation) => {
      // Loop through special_attributes instead of attributes
      variation.special_attributes?.forEach((attr) => {
        const key = String(attr.attribute_id);

        if (!map.has(key)) {
          map.set(key, {
            attribute_id: String(attr.attribute_id),
            attribute_name: attr.attribute_name,
            values: [],
          });
        }

        const group = map.get(key);

        const exists = group.values.some(
          (v) => String(v.option_id) === String(attr.option_id),
        );

        if (!exists) {
          group.values.push({
            option_id: String(attr.option_id),
            value: attr.option_value, // Using option_value from your API structure
            variation_id: variation.id,
          });
        }
      });
    });

    return Array.from(map.values());
  }, [current]);

  const handleSelectVariation = (variationId) => {
    setCurrentVariationId(variationId);
  };

  const { isOpen, modalData, modalMode, openModal, closeModal } = useModal();

  const deleteVariation = useDelete({
    invalidateQueries: [["variations"], ["products", id]],

    onSuccess: async () => {
      await refetch();

      notify("تمت العملية بنجاح", "success");
    },

    onError: () => {
      notify("هناك خطأ ما", "error");
    },
  });

  const { deleteOpen, itemName, closeDelete, openDelete, confirmDelete } =
    useDel(async (item) => {
      await deleteVariation.mutateAsync({
        url: `/variations/${item.group_key}`,
      });

      closeDelete();
    });

  const attributesoptions = useMemo(() => {
    return attributes.map((item) => ({
      value: String(item.id),
      label: item.name || item.value,
    }));
  }, [attributes]);

  const addVariation = usePost({
    invalidateQueries: [["variations"], ["products", id]],

    onSuccess: async () => {
      await refetch();

      notify("تمت العملية بنجاح", "success");
    },

    onError: (error) => {
      console.error(error);

      notify("هناك خطأ ما", "error");
    },
  });

  const initialValues = useMemo(() => {
    // =========================================
    // CREATE / ADD MODE (Default Blank State)
    // =========================================
    if (modalMode !== "edit" || !modalData) {
      return {
        product_id: id,
        group_key: "",
        images: [],
        characteristics: [{ name: "" }],
        group_attribute: "",
        group_option: "",
        child_attribute: "", // Added global child attribute key
        variations: [
          {
            id: null,
            sku: "",
            base_price: "",
            base_buy_price: "",
            quantity: "",
            attribute: "",
            option: "",
          },
        ],
      };
    }

    // =========================================
    // EDIT MODE (Populating from existing Data)
    // =========================================
    const group = current;
    const items = group?.items || [];
    const sharedAttribute = group?.attributes || [];

    // Find if there is a child attribute already used across the items
    const fallbackChildAttributeId = items[0]?.special_attributes?.[0]
      ? String(items[0].special_attributes[0].attribute_id)
      : "";

    const globalCharacteristics = group?.characteristics || [];
    const mappedCharacteristics = globalCharacteristics.length
      ? globalCharacteristics.map((item) => ({
          id: item.id || null,
          name: typeof item === "string" ? item : item.name || "",
        }))
      : [{ name: "" }];
    return {
      product_id: id,
      group_key: group.group_key || "",
      images: Array.isArray(group.images)
        ? group.images.map((img) => ({
            id: img.id || null,
            path_url:
              typeof img === "string" ? img : img.path_url || img.path || "",
            existing: true,
          }))
        : [],
      group_attribute: sharedAttribute.length
        ? String(sharedAttribute[0].attribute_id)
        : "",
      group_option: sharedAttribute.length
        ? String(sharedAttribute[0].option_id)
        : "",
      child_attribute: fallbackChildAttributeId, // 👈 Must be stringified correctly
      characteristics: mappedCharacteristics,
      variations: items.map((variation) => {
        const variationAttr = variation.special_attributes?.[0] || null;

        return {
          id: variation.id,
          sku: variation.sku || "",
          base_price: variation.base_price || "",
          base_buy_price: variation.base_buy_price || "",
          quantity: variation.quantity ?? "",
          characteristics: variation.characteristics,
          attribute: variationAttr
            ? String(variationAttr.attribute_id)
            : fallbackChildAttributeId,
          option: variationAttr ? String(variationAttr.option_id) : "",
        };
      }),
    };
    // 👇 FIXED: Added all necessary reactive dependencies here
  }, [modalMode, modalData, current, id]);

  /**
   * =========================================
   * SUBMIT
   * =========================================
   */

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const formData = new FormData();

      formData.append("product_id", id);

      if (values.group_key) {
        formData.append("group_key", values.group_key);
      }

      values.variations.forEach((variation, index) => {
        formData.append(`variations[${index}][sku]`, variation.sku || "");

        formData.append(
          `variations[${index}][base_price]`,
          variation.base_price || 0,
        );

        formData.append(
          `variations[${index}][base_buy_price]`,
          variation.base_buy_price || 0,
        );

        formData.append(
          `variations[${index}][quantity]`,
          variation.quantity || 0,
        );

        /**
         * ATTRIBUTES OBJECT
         */
        const attrs = {};

        /**
         * GROUP ATTRIBUTE
         */
        if (values.group_attribute && values.group_option) {
          attrs[values.group_attribute] = Number(values.group_option);
        }

        /**
         * VARIATION ATTRIBUTE
         */
        if (variation.attribute && variation.option) {
          attrs[variation.attribute] = Number(variation.option);
        }

        Object.entries(attrs).forEach(([key, value]) => {
          formData.append(`variations[${index}][attributes][${key}]`, value);
        });
      });

      values.characteristics?.forEach((item, index) => {
        if (item.name?.trim()) {
          formData.append(`characteristics[${index}][name]`, item.name.trim());

          // If editing an existing characteristic element from the global dictionary
          if (item.id) {
            formData.append(`characteristics[${index}][id]`, item.id);
            formData.append(`characteristics[${index}][existing]`, "true");
          }
        }
      });

      // Find your image handling logic in handleSubmit and replace it with this:

      values.images.forEach((img, index) => {
        if (img.file) {
          // 1. Send raw files under the 'images[]' key so Laravel validates them properly
          formData.append("images[]", img.file);
        } else if (img.existing) {
          // 2. Send existing metadata under a different namespace to bypass the image validator
          formData.append(`existing_images[${index}][id]`, img.id);
          formData.append(`existing_images[${index}][existing]`, "true");
        }
      });

      /**
       * UPDATE
       */
      if (modalMode === "edit") {
        formData.append("_method", "PUT");

        await addVariation.mutateAsync({
          url: `/variations/${values.group_key}`,
          data: formData,
        });
      } else {
        /**
         * CREATE
         */
        await addVariation.mutateAsync({
          url: "/variations",
          data: formData,
        });
      }

      notify("تمت العملية بنجاح", "success");

      closeModal();

      resetForm();
    } catch (error) {
      console.error(error);

      notify("هناك خطأ", "error");
    } finally {
      setSubmitting(false);
    }
  };

  /**
   * =========================================
   * FORMIK
   * =========================================
   */
  const { formikProps, handleConfirm } = useForm({
    initialValues,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <Control
        searchable={false}
        onClick={() => openModal("add")}
        children2={
          current ? (
            <div className="flex w-full justify-start gap-x-4 text-end">
              <div className="bordered p-2 rounded cursor-pointer">
                <Trash2
                  size={20}
                  className="text-red-600"
                  onClick={() => openDelete(current)}
                />
              </div>

              <div className="bordered p-2 rounded cursor-pointer">
                <Pencil
                  size={20}
                  className="text-blue-600"
                  onClick={() => openModal("edit", current)}
                />
              </div>
            </div>
          ) : null
        }
      />

      {/* ========================================= */}
      {/* VIEW */}
      {/* ========================================= */}

      {current && currentVariation && (
        <div className="grid grid-cols-3 gap-x-16 py-4">
          <Imagegallery
            key={current.group_key}
            images={images}
            variations={variations}
            onClick={handleVariationClick}
          />

          <div className="flex flex-col text-sm gap-y-8 ">
            <div className="grid grid-cols-2 gap-4 ">
              <span>سعر الشراء : {currentVariation?.base_buy_price}$</span>

              <span>سعر البيع : {currentVariation?.base_price}$</span>

              <span>الكمية : {currentVariation?.quantity}</span>
            </div>

            <div className="space-y-6">
              {variationAttributes.map((attribute) => (
                <div key={attribute.attribute_id}>
                  <h3 className="mb-3">{attribute.attribute_name} :</h3>

                  <div className="flex flex-wrap gap-4">
                    {attribute.values.map((option) => {
                      const isActive =
                        currentVariation?.special_attributes?.some(
                          (a) =>
                            String(a.attribute_id) ===
                              String(attribute.attribute_id) &&
                            String(a.option_id) === String(option.option_id),
                        );

                      return (
                        <button
                          key={option.option_id}
                          onClick={() =>
                            handleSelectVariation(option.variation_id)
                          }
                          className={`px-4 py-2 rounded border transition ${
                            isActive
                              ? "bg-cyan-600 text-white border-cyan-600"
                              : "hover:bg-cyan-50"
                          }`}
                        >
                          {option.value}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-1">
              <h3> المواصفات :</h3>

              {current.characteristics.map((characteristic) => (
                <div
                  key={characteristic.id}
                  className=" flrx flex-col  ps-4 pt-2"
                >
                  <div className=" flex gap-x-1 text-xs items-center">
                    ⁕ <span>{characteristic.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================= */}
      {/* MODAL */}
      {/* ========================================= */}

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        size="2xl"
        showFooter
        onConfirm={handleConfirm}
        isConfirmLoading={addVariation.isPending}
        title={modalMode === "add" ? "اضافة شكل" : "تعديل الشكل"}
      >
        <Formik {...formikProps} enableReinitialize>
          {({ values }) => {
            const selectedGroupAttribute = attributes.find(
              (attr) => String(attr.id) === String(values.group_attribute),
            );

            const groupOptions =
              selectedGroupAttribute?.options?.map((option) => ({
                value: String(option.id),
                label: option.value,
              })) || [];

            const filteredChildAttributeOptions = attributesoptions.filter(
              (option) =>
                String(option.value) !== String(values.group_attribute),
            );

            return (
              <Form className="space-y-8">
                <ChildAttributeFormSync
                  attributes={attributes}
                  modalMode={modalMode}
                  originalGroupData={current} // 👈 Pass the raw query data here
                />
                <div className="grid grid-cols-3 gap-4">
                  <FormikSelect
                    name="group_attribute"
                    label="الصفة الاساسية"
                    options={attributesoptions}
                  />
                  <FormikSelect
                    name="group_option"
                    label="القيمة"
                    options={groupOptions}
                    disabled={!values.group_attribute}
                  />
                  <FormikSelect
                    name="child_attribute"
                    label="الصفة الفرعية"
                    options={filteredChildAttributeOptions}
                    disabled={!values.group_attribute}
                  />
                </div>
                <FieldArray name="variations">
                  {({ remove }) => (
                    <div className="bordered rounded-lg p-4 space-y-6">
                      <div className="flex items-center justify-between">
                        <h2 className="text-sm font-bold text-cyan-700">
                          الصفات الموافقة :
                        </h2>

                        {/* <Plus
                          size={30}
                          className="border p-1 rounded cursor-pointer"
                          onClick={() =>
                            push({
                              sku: "",
                              base_price: "",
                              base_buy_price: "",
                              quantity: "",
                              attribute: "",
                              option: "",
                            })
                          }
                        /> */}
                      </div>

                      {values.variations?.map((variation, index) => {
                        const selectedAttribute = attributes.find(
                          (attr) =>
                            String(attr.id) === String(variation.attribute),
                        );

                        const options =
                          selectedAttribute?.options?.map((option) => ({
                            value: String(option.id),
                            label: option.value,
                          })) || [];

                        return (
                          <div
                            key={index}
                            className="
                              grid
                              grid-cols-5
                              gap-2
                              items-end
                              border-b
                              pb-4
                            "
                          >
                            <FormikSelect
                              name={`variations.${index}.attribute`}
                              label="الصفة : "
                              options={attributesoptions}
                            />

                            <FormikSelect
                              name={`variations.${index}.option`}
                              label="القيمة :"
                              options={options}
                              disabled={!variation.attribute}
                            />

                            <FormikInput
                              name={`variations.${index}.base_price`}
                              label="سعر البيع :"
                            />

                            <FormikInput
                              name={`variations.${index}.base_buy_price`}
                              label="سعر الشراء :"
                            />

                            <FormikInput
                              name={`variations.${index}.quantity`}
                              label="الكمية :"
                            />

                            {/* <div className="flex justify-center pb-3">
                              <Trash2
                                size={24}
                                className="cursor-pointer text-red-600"
                                onClick={() => remove(index)}
                              />
                            </div> */}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </FieldArray>
                {/* ========================================= */}
                {/* CHARACTERISTICS SECTION */}
                {/* ========================================= */}
                <FieldArray name="characteristics">
                  {({ push, remove }) => (
                    <div className="border rounded-xl p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <h2 className="font-bold text-cyan-700">
                          الخصائص العامة للمجموعة :
                        </h2>

                        <Plus
                          size={28}
                          className="border p-1 rounded cursor-pointer hover:bg-slate-50"
                          onClick={() => push({ name: "" })}
                        />
                      </div>

                      {values.characteristics?.map((item, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <div className="flex-1">
                            <FormikInput
                              label={`الخاصة رقم ${index + 1}`}
                              name={`characteristics.${index}.name`}
                              placeholder="مثال: مقاوم للماء، قطن 100%..."
                            />
                          </div>

                          <Trash2
                            size={22}
                            className="mt-6 cursor-pointer text-red-600 hover:text-red-800 transition-colors"
                            onClick={() => {
                              if (values.characteristics.length > 1) {
                                remove(index);
                              } else {
                                notify(
                                  "يجب أن تحتوي المجموعة على خاصية واحدة على الأقل أو اتركها فارغة",
                                  "info",
                                );
                              }
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </FieldArray>
                <Formikimagem
                  name="images"
                  label="صور اللون"
                  chooseText="اختر الصور"
                  emptyText="لا توجد صور"
                  maxFiles={10}
                />
              </Form>
            );
          }}
        </Formik>
      </Modal>

      <Delete
        isOpen={deleteOpen}
        itemName={itemName}
        onClose={closeDelete}
        onConfirm={confirmDelete}
      />
    </>
  );
}

export default Tutorial;
