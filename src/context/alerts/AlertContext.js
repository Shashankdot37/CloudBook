import React, { createContext, useState } from "react";

export const AlertContext = createContext();

const AlertProvider = (props) => {
  const [alert, setAlert] = useState({ message: "", type: ""});
  const showAlert = (message,type) =>
  {
    setAlert({message,type});
    setTimeout(() => {
        setAlert({message:"", type:""})
    }, 3000);
  }
  return (
    <>
      <AlertContext.Provider value={{alert,showAlert}}>
        {props.children}
      </AlertContext.Provider>
    </>
  );
};
export default AlertProvider;