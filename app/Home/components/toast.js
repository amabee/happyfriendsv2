import { Toaster } from "@/components/ui/toaster";
import toast from "react-hot-toast";

export const ToastNotif = (type, message) => {
  const baseStyle = {
    background: "#fff", // dark background
    color: "#fff", // white text
    fontSize: "18px", // larger text
    padding: "16px", // increased padding
    borderRadius: "8px",
    border: "1px solid #444", // subtle border
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
    case "info":
      toast(message, {
        style: {
          ...baseStyle,
          border: "1px solid #2196f3",
        },
      });
      break;
    default:
      toast(message, {
        style: baseStyle,
      });
  }
};

const ToastNotify = ({ position }) => {
  return (
    <div>
      <Toaster position={position} />
    </div>
  );
};

export default ToastNotify;
