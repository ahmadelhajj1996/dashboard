import PropTypes from "prop-types";

const Delete = ({ isOpen, itemName, title='تأكيد الحذف ' , note='⚠️ لا يمكن التراجع عن هذا الاجراء' , onClose, onConfirm , className  }) => {
  
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      {/* Modal Container - Centered with max width */}
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl  text-gray-800">{title}</h2>
        </div>

        {/* Modal Body */}
        <div className="px-6 py-4">
          <p className="text-gray-600 mb-2">
            <span className=" text-gray-800">{itemName}</span>
          </p>
          <p className="text-xs text-red-600">
            {note}
          </p>
        </div>

        {/* Modal Footer with Actions */}
        <div className="border-t border-gray-200 px-6 py-4 flex justify-start gap-3">
          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-2 ${className}`}
          >
            {/* {isDeleting ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                Deleting...
              </>
            ) : ( */}
            تاكيد
            {/* )} */}
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
  title : PropTypes.string,
  note : PropTypes.string ,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  className: PropTypes.string,
}

export default Delete;
