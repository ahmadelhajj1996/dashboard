import { useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";

import Control from "../components/Control";
import Select from "../components/Select";
import Table from "../components/Table";
import Modal from "../components/Modal";
import Delete from "../components/Delete";
import Loading from "../components/Loading";

import FormikInput from "../components/Formikinput";
import FormikSelect from "../components/Formikselect";

import { useSelect } from "../hooks/useSelect";
import { useGet, usePost, useDelete } from "../hooks/useApi";
import { useModal } from "../hooks/useModal";
import useDel from "../hooks/useDelete";
import { useForm } from "../hooks/useForm";
import useQueryState from "../hooks/useQueryState";
import useSearch from "../hooks/useSearch";

import toFormData from "../utils/toFormData";
import { productcols } from "../utils/columns";
import { productSchema } from "../utils/validator";
import Info from "../components/Info";
import notify from "../utils/toastr";

function Products() {
  const navigate = useNavigate();

  /*
    |--------------------------------------------------------------------------
    | Query State
    |--------------------------------------------------------------------------
    */

  const { filters, setFilter, setFilters } = useQueryState({
    category: "",
    subcategory: "",
  });

  const { category, subcategory } = filters;

  /*
    |--------------------------------------------------------------------------
    | Modal
    |--------------------------------------------------------------------------
    */

  const { isOpen, modalData, modalMode, openModal, closeModal } = useModal();

  /*
    |--------------------------------------------------------------------------
    | Categories
    |--------------------------------------------------------------------------
    */

  const { data: categoriesData = [], isFetched } = useGet(
    ["categories"],
    "categories",
    {
      staleTime: Infinity,

      select: (response) => response?.data || [],
    },
  );

  const categories = useMemo(() => {
    return (
      categoriesData
        ?.filter((item) => item.parent_id == null)
        ?.map(({ id, name }) => ({
          id: String(id),
          name,
        })) || []
    );
  }, [categoriesData]);

  const subcategories = useMemo(() => {
    if (!category) return [];

    return (
      categoriesData
        ?.filter((item) => String(item.parent_id) === String(category))
        ?.map(({ id, name }) => ({
          id: String(id),
          name,
        })) || []
    );
  }, [categoriesData, category]);

  const parent = useMemo(() => {
    if (!category) return [];

    return (
      categories
        ?.filter((item) => String(item.id) === String(category))
        ?.map(({ name }) => name) || []
    );
  }, [categories, category]);

  const child = useMemo(() => {
    if (!subcategory) return null;

    return (
      categoriesData?.find((item) => String(item.id) === String(subcategory))
        ?.name || null
    );
  }, [categoriesData, subcategory]);

  /*
    |--------------------------------------------------------------------------
    | Filters Validation
    |--------------------------------------------------------------------------
    */

  useEffect(() => {
    if (!isFetched) return;

    const validCategory = categories.some((cat) => cat.id === category);

    if (!validCategory && category) {
      setFilters({
        category: "",
        subcategory: "",
      });

      return;
    }

    if (subcategory) {
      const validSubcategory = subcategories.some(
        (sub) => sub.id === subcategory,
      );

      if (!validSubcategory) {
        setFilter("subcategory", "");
      }
    }
  }, [
    isFetched,
    categories,
    subcategories,
    category,
    subcategory,
    setFilter,
    setFilters,
  ]);

  /*
    |--------------------------------------------------------------------------
    | Products Query
    |--------------------------------------------------------------------------
    */

  const queryParams = useMemo(() => {
    const params = new URLSearchParams();

    if (subcategory) {
      params.append("category_id", subcategory);
    } else if (category) {
      params.append("category_id", category);
    }

    return params.toString();
  }, [category, subcategory]);

  const productQueryKey = useMemo(
    () => ["products", category ?? null, subcategory ?? null],
    [category, subcategory],
  );

  const {
    data: products = [],
    isLoading,
    refetch
    // isFetched,
  } = useGet(productQueryKey, `products?${queryParams}`, {
    enabled: true,

    keepPreviousData: true,

    staleTime: 1000 * 60 * 5,

    select: (response) => response?.data?.data || [],
  });

  /*
    |--------------------------------------------------------------------------
    | Normalize Products
    |--------------------------------------------------------------------------
    */

  const normalized = useMemo(() => {
    if (!products) return [];

    return products.map((item) => ({
      id: item?.id,
      name: item?.name,
      featured_image: item?.featured_image,
      status: item?.status,
      is_featured: item?.is_featured,
      is_active: item?.is_active,
      description: item?.description,
      featured_image_url: item?.featured_image_url,
      category_id: item?.category_id,
      subcategory_id: item?.subcategory_id,
    }));
  }, [products]);

  /*
    |--------------------------------------------------------------------------
    | Search
    |--------------------------------------------------------------------------
    */

  const { search, setSearch, filteredData } = useSearch(normalized ?? [], [
    "name",
    "status",
  ]);

  /*
    |--------------------------------------------------------------------------
    | Add Product
    |--------------------------------------------------------------------------
    */
  
  const addProduct = usePost({
    invalidateQueries: productQueryKey,

    onSuccess: async () => {
      await refetch();
      notify("تمت العملية بنجاح ", "success");
      notify('ابدا باضافة اشكال وصور المنتح' , 'success ')

    },

    onError: () => {
      notify("هناك خطأ ما ", "error");
    },
  });

  /*
    |--------------------------------------------------------------------------
    | Delete Product
    |--------------------------------------------------------------------------
    */

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

  /*
    |--------------------------------------------------------------------------
    | Form Submit
    |--------------------------------------------------------------------------
    */

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

  /*
    |--------------------------------------------------------------------------
    | Initial Values
    |--------------------------------------------------------------------------
    */

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

  /*
    |--------------------------------------------------------------------------
    | Form
    |--------------------------------------------------------------------------
    */

  const { formikProps, handleConfirm } = useForm({
    onSubmit: handleSubmit,

    initialValues,

    validationSchema: productSchema,
  });

  /*
    |--------------------------------------------------------------------------
    | Select Options
    |--------------------------------------------------------------------------
    */

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

  /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    */

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Info
        title={`صفحة المنتجات ${category ? `- ${parent}` : " - ( الرجاء اختار الصنف الرئيسي ) "} ${subcategory ? `- ${child}` : " - ( الرجاء اختار الصنف الفرعي )  "} `}
      />

      <Control
        searchable={true}
        isPlus={!!subcategory}
        search={search}
        setSearch={setSearch}
        onClick={() => {
          openModal("add");
        }}
      >
        <div className="flex gap-x-8">
          <div className="w-[200px]">
            <Select
              label="اختر الصنف الرئيسي"
              value={category}
              onChange={(value) => {
                setFilters({
                  category: value,
                  subcategory: "",
                });
              }}
              options={categories.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </div>

          {/* SUBCATEGORY */}
          {category && subcategories.length > 0 && (
            <div className="w-[200px]">
              <Select
                label="اختر الصنف الفرعي"
                value={subcategory}
                onChange={(value) => {
                  setFilter("subcategory", value);
                }}
                options={subcategories.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
              />
            </div>
          )}
        </div>
      </Control>

      {subcategory && (
        <div>
          <Table
            columns={productcols}
            data={filteredData}
            rowsPerPage={7}
            showPagination={true}
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
        </div>
      )}

      {/* MODAL */}
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title={modalMode === "add" ? "إضافة منتج" : "تعديل المنتج"}
        size="xl"
        showFooter={true}
        onConfirm={handleConfirm}
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
