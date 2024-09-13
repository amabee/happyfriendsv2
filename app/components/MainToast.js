import React from "react";
import toast, { Toaster } from "react-hot-toast";

export const MainToastNotif = (message, type) => {
  const baseStyle = {
    borderRadius: "12px",
    background: "#333", // dark background
    color: "#fff", // light text
    padding: "16px", // increased padding
    fontSize: "16px", // larger text
    height: "auto",
    width: "350px", // wider toast
  };

  switch (type) {
    case "success":
      toast.success(message, {
        style: {
          ...baseStyle,
          border: "1px solid #4caf50",
        },
      });
      break;

    case "error":
      toast.error(message, {
        style: {
          ...baseStyle,
          border: "1px solid #f44336", 
        },
      });
      break;

    default:
      toast(message, {
        style: {
          ...baseStyle,
          border: "1px solid #2196f3",
        },
      });
      break;
  }
};

const MainToast = ({ position }) => {
  return (
    <div>
      <Toaster position={position} />
    </div>
  );
};

export default MainToast;
