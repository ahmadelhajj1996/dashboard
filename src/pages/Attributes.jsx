import FormikInput from "../components/Formikinput";
import FormikSelect from "../components/Formikselect";
import Loading from "../components/Loading";
import Control from "../components/Control";
import Table from "../components/Table";
import Modal from "../components/Modal";
import Delete from "../components/Delete";

import { useMemo } from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";

import { useGet, usePost, useDelete } from "../hooks/useApi";
import { useSelect } from "../hooks/useSelect";
import { useModal } from "../hooks/useModal";
import useDel from "../hooks/useDelete";
import { useForm } from "../hooks/useForm";
import useSearch from "../hooks/useSearch";

import { attributecols } from "../utils/columns";
import { attributeSchema } from "../utils/validator";

import toFormData from "../utils/toFormData";
import Info from "../components/Info";
import notify from "../utils/toastr";

function Attributes() {
  const navigate = useNavigate();

  // GET DATA
  const { data, isFetched } = useGet(["attributes"], "attributes", {
    staleTime: Infinity,

    select: (response) => response?.data?.data,
  });

  // NORMALIZE DATA
  const normalized = useMemo(() => {
    if (!data) return [];

    return data.map((item) => ({
      id: item?.id,
      name: item?.name,
      type: item?.type,
      count: item?.options?.length,
    }));
  }, [data]);

  // SEARCH
  const { search, setSearch, filteredData } = useSearch(normalized ?? [], [
    "name",
    "type",
  ]);

  // SELECT OPTIONS
  const { options } = useSelect(() => {
    return [
      { label: "اختيار", value: "select" },
      { label: "نص", value: "text" },
    ];
  });

  // MODAL
  const { isOpen, modalData, modalMode, openModal, closeModal } = useModal();

  const addItem = usePost({
    invalidateQueries: ["attributes"],

    onSuccess: () => {
      notify("تمت العملية بنجاح ", "success");
    },

    onError: () => {
      notify("هناك خطأ ما ", "error");
    },
  });

  const deleteItem = useDelete({
    invalidateQueries: ["attributes"],

    onSuccess: () => {
      notify("تمت العملية بنجاح ", "success");
    },

    onError: () => {
      notify("هناك خطأ ما ", "error");
    },
  });

  // DELETE MODAL
  const { deleteOpen, itemName, openDelete, closeDelete, confirmDelete } =
    useDel(async (deletedItem) => {
      try {
        await deleteItem.mutateAsync({
          url: `/attributes/${deletedItem.id}`,
          id: deletedItem.id,
        });

        closeDelete();
      } catch (error) {
        console.error(error);
      }
    });

  // SUBMIT
  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const formData = toFormData(values);

      let request;

      if (modalMode === "add") {
        request = addItem.mutateAsync({
          url: "/attributes",
          data: formData,
        });
      } else {
        formData.append("_method", "PUT");

        request = addItem.mutateAsync({
          url: `/attributes/${modalData.id}`,
          data: formData,
        });
      }

      await request;

      closeModal();
      resetForm();
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  // INITIAL VALUES
  const initialValues = useMemo(() => {
    if (modalMode === "edit" && modalData) {
      const { name, type } = modalData;

      return {
        name,
        type,
      };
    }

    return {
      name: "",
      type: "select",
    };
  }, [modalMode, modalData]);

  // FORM
  const { formikProps, handleConfirm } = useForm({
    onSubmit: handleSubmit,
    initialValues,
    validationSchema: attributeSchema,
  });

  if (!isFetched) {
    return <Loading />;
  }

  return (
    <>
      <Info title={`  حدول الصفات`} />
      <Control
        searchable={true}
        isPlus={true}
        search={search}
        setSearch={setSearch}
        onClick={() => {
          openModal("add");
        }}
      />

      <Table
        columns={attributecols}
        data={filteredData}
        onView={(row) => navigate(`/attributes/${row.id}`)}
        onEdit={(item) => {
          openModal("edit", item);
        }}
        onDelete={(item) => openDelete(item, item.name)}
        rowsPerPage={5}
        showPagination={true}
        paginationPosition="bottom"
        actions={{
          showView: true,
          showEdit: true,
          showDelete: true,
        }}
      />

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title={modalMode === "add" ? "إضافة صفة" : "تعديل الصفة"}
        size="md"
        showFooter={true}
        onConfirm={handleConfirm}
      >
        <Formik {...formikProps}>
          <Form className="space-y-4">
            <FormikInput name="name" label="اسم الصفة :" placeholder="" />

            <FormikSelect name="type" label="النمط :" options={options} />
          </Form>
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

export default Attributes;
