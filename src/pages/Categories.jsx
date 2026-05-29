import { useMemo } from "react";

import Table from "../components/Table";
import Loading from "../components/Loading";
import Control from "../components/Control";
import Modal from "../components/Modal";
import Delete from "../components/Delete";
import FormikInput from "../components/Formikinput";

import { Formik, Form } from "formik";

import { categorycols } from "../utils/columns";
import { categorySchema } from "../utils/validator";

import { useGet, usePost, useDelete } from "../hooks/useApi";
import useSearch from "../hooks/useSearch";
import useQueryState from "../hooks/useQueryState";
import { useModal } from "../hooks/useModal";
import useDel from "../hooks/useDelete";
import { useForm } from "../hooks/useForm";

import toFormData from "../utils/toFormData";
import Info from "../components/Info";
// import Formikimage from "../components/Formikimage";
import notify from "../utils/toastr";
function Categories() {
  /*
   |--------------------------------------------------------------------------
   | Query State
   |--------------------------------------------------------------------------
   */

  const { filters, setFilters } = useQueryState({
    parent_id: "",
  });

  const { parent_id } = filters;

  const queryKey = useMemo(
    () => ["categories", parent_id ?? null],
    [parent_id],
  );

  const {
    data: categories = [],
    isFetched,
    refetch,
  } = useGet(queryKey, "categories", {
    staleTime: 0,

    refetchOnMount: true,

    refetchOnWindowFocus: true,

    select: (response) =>
      response?.data?.filter((item) =>
        parent_id
          ? String(item.parent_id) === String(parent_id)
          : item.parent_id == null,
      ) || [],
  });

  console.log(categories ?? []);

  const data = useMemo(() => {
    if (!categories) return [];

    return categories.map((item) => ({
      id: item?.id,
      name: item?.name,
      count: item?.children?.length,
      image: item?.image,
      image_url: item?.image_url,
      parent: item?.parent?.name,
    }));
  }, [categories]);

  /*
   |--------------------------------------------------------------------------
   | Search
   |--------------------------------------------------------------------------
   */

  const { search, setSearch, filteredData } = useSearch(data, ["name"]);

  /*
   |--------------------------------------------------------------------------
   | Modal
   |--------------------------------------------------------------------------
   */

  const { isOpen, modalData, modalMode, openModal, closeModal } = useModal();

  /*
   |--------------------------------------------------------------------------
   | Create / Update Category
   |--------------------------------------------------------------------------
   */

  const addItem = usePost({
    invalidateQueries: [queryKey, ["categories"]],

    onSuccess: async () => {
      await refetch();
      notify("تمت العملية بنجاح ", "success");
    },

    onError: () => {
      notify("هناك خطأ ما ", "error");
    },
  });

  const deleteItem = useDelete({
    invalidateQueries: [queryKey, ["categories"]],

    onSuccess: async () => {
      await refetch();
      notify("تمت العملية بنجاح ", "success");

    },

    onError: () => {
      notify("هناك خطأ ما ", "error");

    },
  });

  /*
   |--------------------------------------------------------------------------
   | Delete Logic
   |--------------------------------------------------------------------------
   */

  const { deleteOpen, itemName, openDelete, closeDelete, confirmDelete } =
    useDel(async (deletedItem) => {
      try {
        await deleteItem.mutateAsync({
          url: `/categories/${deletedItem.id}`,
          id: deletedItem.id,
        });

        closeDelete();
      } catch (error) {
        console.error(error);
      }
    });

  /*
   |--------------------------------------------------------------------------
   | Submit
   |----------------------------------------------p----------------------------
   */

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const formData = toFormData(values);

      let request;

      if (modalMode === "add") {
        request = addItem.mutateAsync({
          url: "/categories",
          data: formData,
        });
      } else {
        formData.append("_method", "PUT");

        request = addItem.mutateAsync({
          url: `/categories/${modalData.id}`,
          data: formData,
        });
      }

      await request;

      await refetch();

      closeModal();

      resetForm();
    } catch (error) {
      console.error("Submission error:", error);
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
        name: modalData.name || "",
        parent_id: parent_id || null,
        type: parent_id ? "sub" : "main",
        image: null,
        image_url: modalData?.image_url || "",
        remove_image: 0,
      };
    }

    return {
      name: "",
      parent_id: parent_id || null,
      type: parent_id ? "sub" : "main",
      image: null,
    };
  }, [modalMode, modalData, parent_id]);

  /*
   |--------------------------------------------------------------------------
   | Form
   |--------------------------------------------------------------------------
   */

  const { formikProps, handleConfirm } = useForm({
    onSubmit: handleSubmit,

    initialValues,

    validationSchema: categorySchema,
  });

  // console.log(parentCategory);

  if (!isFetched) {
    return <Loading />;
  }

  return (
    <>
      <Info
        title={
          parent_id
            ? `الاصناف الفرعية  ${categories?.length ? `ل  "${categories[0]?.parent?.name}"  ` : " "}`
            : `الاصناف الرئيسية`
        }
        back={parent_id ? true : false}
      />

      <Control
        searchable={true}
        isPlus={true}
        search={search}
        setSearch={setSearch}
        onClick={() => openModal("add")}
      />

      <div className="w-1/2">
        <Table
          columns={categorycols}
          data={filteredData}
          rowsPerPage={5}
          showPagination={true}
          paginationPosition="bottom"
          actions={{
            showView: true,
            showEdit: true,
            showDelete: true,
          }}
          onView={(row) =>
            setFilters({
              parent_id: row.id,
            })
          }
          onEdit={(row) => {
            openModal("edit", row);
          }}
          onDelete={(row) => {
            openDelete(row, row.name);
          }}
        />
      </div>

      {/* MODAL */}
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title={
          modalMode === "add"
            ? parent_id
              ? "إضافة صنف فرعي"
              : "إضافة صنف رئيسي"
            : "تعديل الصنف"
        }
        size="md"
        showFooter={true}
        onConfirm={handleConfirm}
      >
        <Formik {...formikProps} enableReinitialize>
          <Form className="space-y-4">
            <FormikInput
              name="name"
              label={parent_id ? "اسم الصنف الفرعي :" : "اسم الصنف الرئيسي :"}
              placeholder=""
            />
            {/* <Formikimage
              name="image"
              label="الصورة"
              imageUrlField="image_url"
              removeField="remove_image"
            /> */}
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

export default Categories;
