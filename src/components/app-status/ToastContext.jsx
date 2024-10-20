import React, { createContext, useContext, useRef } from 'react';
import Toastcontainer from './Toastcontainer';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const toastRef = useRef();

  const addToast = (toastType, toastContent, autohide) => {
    toastRef.current.addToast(toastType, toastContent, autohide);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <Toastcontainer ref={toastRef} />
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);