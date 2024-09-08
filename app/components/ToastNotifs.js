import React from "react";
import toast, { Toaster } from "react-hot-toast";

export const ToastNotif = (message, type, func = null, errorMessage = "") => {
  switch (type) {
    case "success":
      toast.success(message, {
        style: {
          borderRadius: "10px",
          background: "#fff",
          color: "#333",
          height: "auto",
          width: "300px",
        },
      });
      break;

    case "error":
      toast.error(message, {
        style: {
          borderRadius: "10px",
          background: "#fff",
          color: "#333",
          height: "auto",
          width: "300px",
        },
      });
      break;

    case "promise":
      if (typeof func === "function") {
        toast.promise(
          (async () => {
            try {
              const result = await func();
              if (result !== true) {
                throw new Error("Function returned false");
              }
              return result;
            } catch (error) {
              throw error;
            }
          })(),
          {
            loading: "loading...",
            success: <b>{message}</b>,
            error: (error) => (
              <b>
                {typeof errorMessage === "function"
                  ? errorMessage(error)
                  : errorMessage}
              </b>
            ),
          },
          {
            style: {
              borderRadius: "10px",
              background: "#fff",
              color: "#333",
              height: "auto",
              width: "300px",
            },
          }
        );
      } else {
        console.error("func is not a function");
      }
      break;
    default:
      toast(message, {
        style: {
          borderRadius: "10px",
          background: "#fff",
          color: "#333",
          height: "50px",
          width: "100px",
        },
      });
      break;
  }
};

const ToastNotification = ({ position }) => {
  return (
    <div>
      <Toaster position={position} />
    </div>
  );
};

export default ToastNotification;
