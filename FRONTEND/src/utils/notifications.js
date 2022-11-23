import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notifyDelete = (deletedPattern) => {
  console.log("toast");
  return toast.success(deletedPattern + " deleted succesfully");
};

export const notifyAdd = (addedPattern) => {
  console.log("toast");
  return toast.success(addedPattern + " added succesfully");
};


export const notifyExist = (mesg  ) => {
  
  return toast.error(mesg || "Already exists");
};

export const notifyUpdate = (addedPattern) => {
  console.log("toast");
  return toast.success(addedPattern + " updated succesfully");
};

export const notifyApprove = () => {
  return toast.success("request approved succesfully");
}

export const notifyDisapprove = () => {
  return toast.success("request disapproved succesfully");
};


export const waitToReload = (pageName, isVisible, setIsVisible) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      setIsVisible({ ...isVisible, [pageName]: false });
      window.location = "/" + pageName;
    }, 2000);
  });
};