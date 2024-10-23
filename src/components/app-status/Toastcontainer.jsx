import React, { useState, useImperativeHandle, forwardRef } from "react";
import ToastContainer from "react-bootstrap/ToastContainer";
import Toasts from "./Toasts";

const Toastcontainer = forwardRef((props, ref) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (toastType, toastContent, autohide = true) => {
    const newToast = {
      id: Date.now(),
      toastType,
      toastContent,
      autohide,
    };
    setToasts([...toasts, newToast]);
  };

  const removeToast = (id) => {
    setToasts(toasts.filter((toast) => toast.id !== id));
  };

  useImperativeHandle(ref, () => ({
    addToast,
  }));

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="position-fixed"
      style={{ 
        minWidth: "500px", 
        minHeight: "240px", 
        zIndex: toasts.length > 0 ? 1 : -1, 
        top: "12%", 
        right: "1%" 
      }}
    >
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1050 }}>
        {toasts.map((toast) => (
          <Toasts
            key={toast.id}
            toastType={toast.toastType}
            toastContent={toast.toastContent}
            autohide={toast.autohide}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </ToastContainer>
    </div>
  );
});

export default Toastcontainer;
