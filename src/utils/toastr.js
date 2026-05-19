import { toast } from "react-toastify";

const notify = (msg, type) => {
  const toastId = toast(msg, {
    position: "top-right",
    closeButton: false,
    autoClose: 2000,
    isLoading: true, 
  });

  setTimeout(() => {
    const styles = {
      success: "bg-green-100 border border-green-200 text-green-800",
      error: "bg-red-100 border border-red-200 text-red-800",
      info: "bg-blue-100 border border-blue-200 text-blue-800",
      warning: "bg-yellow-100 border border-yellow-200 text-yellow-800",
    };

    toast.update(toastId, {
      render: msg,
      type: type,
      isLoading: false,
      className: `p-2 w-[400px] ${styles[type] || styles.success}`,
      bodyClassName: `${type === 'success' ? 'text-green-800' : 
                     type === 'error' ? 'text-red-800' : 
                     type === 'info' ? 'text-blue-800' : 
                     'text-yellow-800'}`,
      autoClose: 2000,
    });
  }, 100);
};


export default notify;


// notify('Please check your input.' , 'error');    