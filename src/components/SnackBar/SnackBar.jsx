import React from "react";
import "./styles.css";

const Snackbar = ({ message }) => {
  if (!message) return null;

  return <div className="snackbar">{message}</div>;
};

export default Snackbar;
