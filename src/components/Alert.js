import React, { useContext } from "react";
import { AlertContext } from "../context/alerts/AlertContext";

const Alert = () => {
  const { alert } = useContext(AlertContext);
  return (
    alert.message && (
      <div className={`alert alert-${alert.type}`} role="alert">
        {alert.message}
      </div>
    )
  );
};

export default Alert;
