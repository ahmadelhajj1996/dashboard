import { useMemo } from "react";
import { Formik, Form } from "formik";
import { useParams } from "react-router-dom";

import FormikInput from "../components/Formikinput";
import Control from "../components/Control";
import Table from "../components/Table";
import Modal from "../components/Modal";
import Delete from "../components/Delete";
import Loading from "../components/Loading";

import { useGet, usePost, useDelete } from "../hooks/useApi";
import { useModal } from "../hooks/useModal";
import useDel from "../hooks/useDelete";
import { useForm } from "../hooks/useForm";
import useSearch from "../hooks/useSearch";

import { optioncols } from "../utils/columns";
import { optionSchema } from "../utils/validator";

import toFormData from "../utils/toFormData";
import Info from "../components/Info";
import notify from "../utils/toastr";

function Attribute() {
  const { id: attribute_id } = useParams();

  // GET DATA
  const { data, isFetched, refetch } = useGet(
    ["attributes-options"],
    "attributes-options",
    {
      staleTime: Infinity,

      select: (response) =>
        response?.data?.data?.filter(
          (item) => item.attribute_id == attribute_id,
        ),
    },
  );

  const normalized = useMemo(() => {
    if (!data) return [];

    return data.map((item) => ({
      id: item.id,
      value: item.value,
      attribute: item.attribute,
    }));
  }, [data]);



  const { search, setSearch, filteredData } = useSearch(normalized ?? [], [
    "value",
  ]);

  const { isOpen, modalData, modalMode, openModal, closeModal } = useModal();

  // ADD / UPDATE
  const addItem = usePost({
    invalidateQueries: ["attributes-options"],

    onSuccess: async () => {
      await refetch();
      notify("تمت العملية بنجاح ", "success");
    },

    onError: () => {
      notify("هناك خطأ ما ", "error");
    },
  });

  // DELETE
  const deleteItem = useDelete({
    invalidateQueries: ["attributes-options"],

    onSuccess: async () => {
      await refetch();
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
          url: `/attributes-options/${deletedItem.id}`,
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
          url: "/attributes-options",
          data: formData,
        });
      } else {
        formData.append("_method", "PUT");

        request = addItem.mutateAsync({
          url: `/attributes-options/${modalData.id}`,
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
      const { value } = modalData;

      return {
        attribute_id,
        value,
      };
    }

    return {
      attribute_id,
      value: "",
    };
  }, [modalMode, modalData, attribute_id]);

  // FORM
  const { formikProps, handleConfirm } = useForm({
    onSubmit: handleSubmit,
    initialValues,
    validationSchema: optionSchema,
  });

  // LOADING
  if (!isFetched) {
    return <Loading />;
  }

  return (
    <>
      <Info
        title={` قيم  ${normalized[0]?.attribute.name}  `}
        back={true}
      />
      <Control
        searchable={true}
        isPlus={true}
        search={search}
        setSearch={setSearch}
        onClick={() => {
          openModal("add");
        }}
      />
      <div className="w-1/2 ">
        <Table
          columns={optioncols}
          data={filteredData}
          onEdit={(item) => {
            openModal("edit", item);
          }}
          onDelete={(item) => openDelete(item, item.value)}
          rowsPerPage={8}
          showPagination={true}
          paginationPosition="bottom"
          actions={{
            showView: false,
            showEdit: true,
            showDelete: true,
          }}
        />
      </div>

      {/* MODAL */}
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
            <FormikInput name="value" label="قيمة الصفة :" placeholder="" />
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

export default Attribute;
