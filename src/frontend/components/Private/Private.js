import React from "react";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import { UserAuth } from "../../context/AuthContext.js";

/**
 * If the user is not logged in, redirect to the home page. Otherwise, render the children
 * @returns The children of the component.
 */
const Protected = ({ children }) => {
  const { user } = UserAuth();
  console.log("Check user in Private: ", user);
  if (!user) {
    Swal.fire({
      title: "Info",
      icon: "info",
      text: "Para ingresar a este apartado, favor de iniciar sesión.",
      showCancelButton: false,
      showConfirmButton: false,
      timer: 4000,
    });
    return <Navigate to="/Login" />;
  }
  return children;
};

/* Exporting the Protected component. */
export default Protected;
