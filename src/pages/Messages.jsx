import FormikInput from "../components/Formikinput";
import Loading from "../components/Loading";
import Control from "../components/Control";
import Table from "../components/Table";
import Modal from "../components/Modal";
import Delete from "../components/Delete";

import { useMemo } from "react";
import { Formik, Form } from "formik";

import { useGet, usePost, useDelete } from "../hooks/useApi";
import { useModal } from "../hooks/useModal";
import useDel from "../hooks/useDelete";
import { useForm } from "../hooks/useForm";
import useSearch from "../hooks/useSearch";

import { messagecols } from "../utils/columns";
import { messageSchema } from "../utils/validator";

import toFormData from "../utils/toFormData";
import Info from "../components/Info";
import notify from "../utils/toastr";

function Messages() {

  // GET DATA
  const { data, isFetched, refetch } = useGet(["messages"], "messages", {
    staleTime: Infinity,

    select: (response) => response?.data?.data,
  });

  // NORMALIZE DATA
  const normalized = useMemo(() => {
    if (!data) return [];

    return data.map((item) => ({
      id: item?.id,
      content: item?.content,
    }));
  }, [data]);

  // SEARCH
  const { search, setSearch, filteredData } = useSearch(normalized ?? [], [
    "content",
  ]);

  const { isOpen, modalData, modalMode, openModal, closeModal } = useModal();

  const addItem = usePost({
    invalidateQueries: ["messages"],

    onSuccess: async () => {
      await refetch();
      notify("تمت العملية بنجاح ", "success");
    },

    onError: () => {
      notify("هناك خطأ ما ", "error");
    },
  });

  const deleteItem = useDelete({
    invalidateQueries: ["messages"],
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
          url: `/messages/${deletedItem.id}`,
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
          url: "/messages",
          data: formData,
        });
      } else {
        formData.append("_method", "PUT");

        request = addItem.mutateAsync({
          url: `/messages/${modalData.id}`,
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
      const { content } = modalData;

      return {
        content,
      };
    }

    return {
      content: "",
    };
  }, [modalMode, modalData]);

  // FORM
  const { formikProps, handleConfirm } = useForm({
    onSubmit: handleSubmit,
    initialValues,
    validationSchema: messageSchema,
  });

  if (!isFetched) {
    return <Loading />;
  }

  return (
    <>

      <Info title={` الرسائل الترحيبية`} />

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
        columns={messagecols}
        data={filteredData}
        onEdit={(item) => {
          openModal("edit", item);
        }}
        onDelete={(item) => openDelete(item, item.name)}
        rowsPerPage={8}
        showPagination={true}
        paginationPosition="bottom"
        actions={{
          // showView: true,
          showEdit: true,
          showDelete: true,
        }}
      />

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title={modalMode === "add" ? "إضافة رسالة" : "تعديل الرسالة"}
        size="md"
        showFooter={true}
        onConfirm={handleConfirm}
      >
        <Formik {...formikProps}>
          <Form className="space-y-4">
            <FormikInput name="content" label="نص الرسالة :" placeholder="" />
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

export default Messages;
