import { X } from "lucide-react";
import PropTypes from "prop-types";

const Delete = ({
  isOpen,
  itemName,
  title = "تأكيد الحذف ",
  note = "⚠️ لا يمكن التراجع عن هذا الاجراء",
  onClose,
  onConfirm,
  className,
}) => {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex rounded-lg items-center justify-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div
        className="bg-white rounded-lg  shadow-xl w-full max-w-md mx-4 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className=" bg-red-500 px-6 py-4 flex items-center justify-between">
          <h2 className="name  text-white">{title}</h2>
          <X onClick={onClose} className=" text-white" />
        </div>

        {/* Modal Body */}
        <div className="px-6 py-4">
          <p className="text-gray-600 mb-2">
            <span className=" text-gray-800">{itemName}</span>
          </p>
          <p className="text-xs text-red-600">{note}</p>
        </div>

        <div className="bordered  px-6 py-4 flex justify-end gap-3">
          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-sm font-medium text-white bg-red-400 rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-2 ${className}`}
          >
            تاكيد
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            الغاء
          </button>
        </div>
      </div>
    </div>
  );
};

Delete.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  itemName: PropTypes.string.isRequired,
  title: PropTypes.string,
  note: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Delete;
