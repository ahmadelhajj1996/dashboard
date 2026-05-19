import { useState, useCallback } from "react";

export const useModal = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const [modalData, setModalData] = useState(null);
  const [modalMode, setModalMode] = useState("add"); // 'add' or 'edit'

  const openModal = useCallback((mode = "add", data = null) => {
    setModalMode(mode);
    setModalData(data);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setModalData(null);
    setModalMode("add");
  }, []);

  const toggleModal = useCallback(() => {
    setIsOpen((prev) => !prev);
    if (isOpen) {
      setModalData(null);
      setModalMode("add");
    }
  }, [isOpen]);

  return {
    isOpen,
    modalData,
    modalMode,
    openModal,
    closeModal,
    toggleModal,
    setIsOpen,
    setModalData,
    setModalMode,
  };
};

// const { isOpen, modalData, modalMode, openModal, closeModal } = useModal();
//   return (
//     <div>
//       <button
//         onClick={() => {
//           openModal("add");
//         }}
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         Add
//       </button>

//       <button
//         onClick={() => {
//           openModal("edit", { id: 1, name: "Example" });
//         }}
//         className="bg-green-500 text-white px-4 py-2 rounded ml-2"
//       >
//         Edit
//       </button>

//       <Modal
//         isOpen={isOpen}
//         onClose={closeModal}
//         title={modalMode === "add" ? "اضافة حديد" : "تعديل "}
//         size="xl"
//         showFooter={true}
//         onConfirm={() => {
//           console.log(modalMode === "edit" ? "Editing ..." : "Adding...");
//           closeModal();
//         }}
//         confirmText={modalMode === "add" ? "اضافة" : "تعديل"}
//         cancelText="الغاء"
//       >
//         <div className="mb-4">
//           <form action="">
//             <label className="block text-sm font-medium text-gray-700 mb-2 text-start">
//               Name
//             </label>
//             <input
//               type="text"
//               required
//               defaultValue={modalMode === "edit" ? modalData?.name : ""}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//               placeholder="Enter name"
//             />
//           </form>
//         </div>
//       </Modal>
//     </div>
