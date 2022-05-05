import { toast } from "react-toastify";

export function showToastr(title, toastrMessage) {
    let upperCaseTitle = title.toUpperCase();
    toast.success(upperCaseTitle + toastrMessage, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };