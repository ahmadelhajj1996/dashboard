// components/Modal.js
import { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { X } from "lucide-react";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  showCloseButton = true,
  closeOnOverlayClick = false,
  closeOnEscape = true,
  onAfterOpen,
  onAfterClose,
  className = "",
  showFooter = false,
  onConfirm,
  confirmText = "تأكيد",
  cancelText = "الغاء",
  isConfirmLoading = false,
}) => {
  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    "2xl": "max-w-6xl",
    full: "max-w-full mx-4",
  };

  const handleClose = useCallback(() => {
    onClose();
    if (onAfterClose) onAfterClose();
  }, [onClose, onAfterClose]);

  const handleOverlayClick = useCallback(
    (e) => {
      if (closeOnOverlayClick && e.target === e.currentTarget) {
        handleClose();
      }
    },
    [closeOnOverlayClick, handleClose],
  );

  const handleConfirm = useCallback(() => {
    if (onConfirm) {
      onConfirm();
    } else {
      handleClose();
    }
  }, [onConfirm, handleClose]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (closeOnEscape && e.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
      if (onAfterOpen) onAfterOpen();
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, closeOnEscape, handleClose, onAfterOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          aria-hidden="true"
          onClick={handleOverlayClick}
        />

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          className={`
          inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl 
          transform transition-all sm:my-8 sm:align-middle w-full ${sizeClasses[size]} ${className}
        `}
        >
          <div className="px-6 py-4 bordered rounded bg-cyan-600 text-white">
            <div className="flex items-center justify-between">
              <h3 className="text-md " id="modal-title">
                {title}
              </h3>
              {showCloseButton && <X onClick={handleClose} />}
            </div>
          </div>

          <div className="px-6 py-4 max-h-[calc(100vh-200px)] overflow-y-auto">
            {children}
          </div>

          {showFooter && (
            <div className="px-6 py-4 bordered  ">
              <div className="flex justify-end gap-2">
                <button
                  type="submit"
                  onClick={handleConfirm}
                  className="px-4 py-2 text-white bg-cyan-600 rounded hover:bg-cyan-800 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isConfirmLoading}
                >
                  {isConfirmLoading ? "Processing..." : confirmText}
                </button>
                <button
                  type="cancel"
                  onClick={handleClose}
                  className="px-4 py-2  bg-white bordered text-gray-600 rounded   transition-colors  hover:bg-gray-50"
                  disabled={isConfirmLoading}
                >
                  {cancelText}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(["sm", "md", "lg", "xl", "2xl", "full"]),
  showCloseButton: PropTypes.bool,
  closeOnOverlayClick: PropTypes.bool,
  closeOnEscape: PropTypes.bool,
  onAfterOpen: PropTypes.func,
  onAfterClose: PropTypes.func,
  className: PropTypes.string,
  showFooter: PropTypes.bool,
  onConfirm: PropTypes.func,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  isConfirmLoading: PropTypes.bool,
};

export default Modal;
