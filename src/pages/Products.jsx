import { useMemo, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Control from "../components/Control";
import Select from "../components/Select";
import Table from "../components/Table";
import { useCategories, useProducts } from "../hooks/useData";
import { productcols } from "../utils/columns";
import { useDelete, usePost } from "../hooks/useApi";
import useSearch from "../hooks/useSearch";
import notify from "../utils/toastr";
import useDel from "../hooks/useDelete";
import toFormData from "../utils/toFormData";
import { productSchema } from "../utils/validator";
import { useSelect } from "../hooks/useSelect";
import { useForm } from "../hooks/useForm";
import { useModal } from "../hooks/useModal";
import Modal from "../components/Modal";
import { Form, Formik } from "formik";
import FormikInput from "../components/Formikinput";
import FormikSelect from "../components/Formikselect";
import Delete from "../components/Delete";
import Info from "../components/Info";

function Products() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const { isOpen, modalData, modalMode, openModal, closeModal } = useModal();

  const category = searchParams.get("category") || null;
  const subcategory = searchParams.get("subcategory") || null;

  const updateFilters = ({ category, subcategory }) => {
    const params = new URLSearchParams();

    if (category) {
      params.set("category", category);
    }

    if (subcategory) {
      params.set("subcategory", subcategory);
    }

    setSearchParams(params);
  };

  const {
    data: categories = [],
    isFetched,
    isLoading: categoriesLoading,
  } = useCategories();

  const parents = useMemo(() => {
    return categories
      .filter((item) => item.parent_id == null)
      .map((item) => ({
        label: item.name,
        value: String(item.id),
        children: item.children || [],
      }));
  }, [categories]);

  const selectedCategory = useMemo(() => {
    return parents.find((item) => item.value === category);
  }, [parents, category]);

  const childs = useMemo(() => {
    if (!selectedCategory) return [];

    return (
      selectedCategory.children.map((item) => ({
        label: item.name,
        value: String(item.id),
      })) || []
    );
  }, [selectedCategory]);

  useEffect(() => {
    if (!isFetched) return;

    if (!category) return;

    if (!subcategory) return;

    const exists = childs.some((item) => item.value === subcategory);

    if (!exists) {
      updateFilters({
        category,
        subcategory: "",
      });
    }
  }, [isFetched, category, subcategory, childs]);

  const {
    data: products = [],
    isFetched: productsFetched,
    isLoading,
    refetch,
  } = useProducts(subcategory);

  const normalized = useMemo(() => {
    return products.map((item) => ({
      id: item.id,

      name: item.name,

      featured_image: item.featured_image,

      status: item.status,

      is_featured: item.is_featured,

      is_active: item.is_active,

      description: item.description,

      featured_image_url: item.featured_image_url,

      category_id: item.category_id,

      subcategory_id: item.subcategory_id,
    }));
  }, [products]);

  const { search, setSearch, filteredData } = useSearch(normalized ?? [], [
    "name",
    "status",
  ]);

  const productQueryKey = useMemo(
    () => ["products", subcategory ?? null],
    [category, subcategory],
  );

  const addProduct = usePost({
    invalidateQueries: productQueryKey,

    onSuccess: async () => {
      await refetch();
      notify("تمت العملية بنجاح ", "success");
      notify("ابدا باضافة اشكال وصور المنتح", "success ");
    },

    onError: () => {
      notify("هناك خطأ ما ", "error");
    },
  });

  const deleteProduct = useDelete({
    invalidateQueries: productQueryKey,

    onSuccess: async () => {
      await refetch();
      notify("تمت العملية بنجاح ", "success");
    },

    onError: () => {
      notify("هناك خطأ ما ", "error");
    },
  });

  const { deleteOpen, itemName, openDelete, closeDelete, confirmDelete } =
    useDel(async (deletedItem) => {
      try {
        await deleteProduct.mutateAsync({
          url: `/products/${deletedItem.id}`,
          id: deletedItem.id,
        });

        closeDelete();
      } catch (error) {
        console.error(error);
      }
    });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const formData = toFormData(values, {
        booleanFields: ["is_active", "is_featured"],
        fileFields: ["featured_image"],
      });

      let request;

      if (modalMode === "add") {
        request = addProduct.mutateAsync({
          url: "/products",
          data: formData,
        });
      } else {
        formData.append("_method", "PUT");

        request = addProduct.mutateAsync({
          url: `/products/${modalData.id}`,
          data: formData,
        });
      }

      console.log(request);

      // const response = await request;

      // if (modalMode === "add") {
      //   navigate(`/products/${response?.data?.id}`);
      // }

      resetForm();
      closeModal();
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const initialValues = useMemo(() => {
    if (modalMode === "edit" && modalData) {
      return {
        category_id: subcategory,
        name: modalData?.name || "",
        status: modalData?.status || "published",
        is_active: modalData?.is_active ? 1 : 0,
        is_featured: modalData?.is_featured ? 1 : 0,
        featured_image: null,
        featured_image_url: modalData?.featured_image_url || "",
        remove_featured_image: 0,
        description: modalData?.description || "...",
      };
    }

    return {
      category_id: subcategory || "",
      name: "",
      status: "published",
      is_active: 1,
      is_featured: 0,
      featured_image: null,
      description: "...",
    };
  }, [modalMode, modalData, subcategory]);

  const { formikProps, handleConfirm } = useForm({
    onSubmit: handleSubmit,

    initialValues,

    validationSchema: productSchema,
  });

  const { options: statusoptions } = useSelect(() => {
    return [
      { label: "منشور ( جاهز )", value: "published" },
      { label: "مسودة", value: "draft" },
      { label: "مؤرشف", value: "archived" },
    ];
  });

  const { options } = useSelect(() => {
    return [
      { label: "نعم", value: 1 },
      { label: "لا", value: 0 },
    ];
  });

  return (
    <>
      <Info title={`صفحة المنتجات `} />

      <Control
        searchable={true}
        isPlus={!!subcategory}
        search={search}
        setSearch={setSearch}
        onClick={() => {
          openModal("add");
        }}
      >
        <div className="flex gap-x-4">
          {/* CATEGORY */}
          {isFetched && (
            <div className="w-[220px]">
              <Select
                label="اختر الصنف الرئيسي"
                loading={categoriesLoading}
                value={category}
                onChange={(value) => {
                  updateFilters({
                    category: value,
                    subcategory: "",
                  });
                }}
                options={parents}
              />
            </div>
          )}

          {!!category && childs.length > 0 && (
            <div className="w-[220px]">
              <Select
                label="اختر الصنف الفرعي"
                value={subcategory}
                onChange={(value) => {
                  updateFilters({
                    category,
                    subcategory: value,
                  });
                }}
                options={childs}
              />
            </div>
          )}
        </div>
      </Control>
      {productsFetched && !!subcategory &&  (
        <Table
          columns={productcols}
          data={filteredData}
          loading={isLoading}
          rowsPerPage={7}
          showPagination
          paginationPosition="bottom"
          actions={{
            showView: true,
            showEdit: true,
            showDelete: true,
          }}
          onView={(row) => navigate(`/products/${row.id}`)}
          onEdit={(row) => {
            openModal("edit", row);
          }}
          onDelete={(row) => {
            openDelete(row, row.name);
          }}
        />
      )}

      {/* MODAL */}
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title={modalMode === "add" ? "إضافة منتج" : "تعديل المنتج"}
        size="xl"
        showFooter={true}
        onConfirm={handleConfirm}
        isConfirmLoading={addProduct.isPending}
      >
        <Formik {...formikProps} enableReinitialize>
          <Form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormikInput name="name" label="الاسم:" placeholder="" />

              <FormikSelect
                name="status"
                label="النمط :"
                options={statusoptions}
              />

              <FormikSelect
                name="is_active"
                label=" هل المنتج نشط:"
                options={options}
              />

              <FormikSelect
                name="is_featured"
                label=" هل المنتج مميز:"
                options={options}
              />
            </div>

            <FormikInput
              type="textarea"
              name="description"
              label="الوصف:"
              placeholder=""
            />
          </Form>
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

export default Products;
