import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Button } from "../../../Indexes/AtomsIndexes";
import { UserAuth } from "../../../../context/AuthContext.js";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signUp } = UserAuth();
  let navigate = useNavigate();

  const handleSubmitRegister = async (e) => {
    let regexPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
    e.preventDefault();
    setError("");
    try {
      if (!email || !password) {
        Swal.fire({
          title: "¡Atención!",
          icon: "info",
          text: "Ningún campo debe de estar vacio. Favor de verificarlos",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 5000,
        });
      } else if (!password.match(regexPassword)) {
        Swal.fire({
          title: "¡Atención!",
          icon: "info",
          text: "La contraseña deberá de tener: Mayúsculas, minúsculas, números y carácteres especiales con una longitud minima de 8. Favor de verificarlos",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 7000,
        });
      } else {
        await signUp(email, password);
        Swal.fire({
          title: "Éxito",
          icon: "success",
          text: "El registro ha sido exitosó",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 4000,
        });
        navigate("/Home");
      }
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "El correo electrónico ya se encuentra en uso. Favor dirigirse al login e ingresar las credenciales correctas ó reestablezca su contraseña",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 5000,
        });
      } else if (err.code === "auth/invalid-email") {
        Swal.fire({
          title: "¡Atención!",
          icon: "warning",
          text: "El formato del correo electrónico es incorrecto. Favor de verificarlo",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 5000,
        });
      } else if (err.code === "auth/weak-password") {
        Swal.fire({
          title: "¡Atención!",
          icon: "warning",
          text: "El formato de la contraseña deberá de tener: Mayúsculas, minúsculas, números y carácteres especiales con una longitud de 6. Favor de verificarlo",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 5000,
        });
      }
      setError(err.message);
    }
    console.clear();
  };

  const togglePassword = () => {
    const inputType = document.querySelector('#password');
    inputType.type === "password" ? (inputType.type = "email") : (inputType.type = "password");
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 col-md-6 register-left center">
            <h1>Registro</h1>
            <Link to="/Home">
              <Button
                type="button"
                text="Regresar al inicio"
                className="btn btn-submit"
              />
            </Link>
          </div>
          <div className="col-sm-12 col-md-6 register-right"></div>
          <div className="col-12 register-bottom">
            {error && (
              <div
                className="alert alert-warning alert-dismissible fade show d-none"
                role="alert"
              >
                <strong>{error}</strong>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
              </div>
            )}
            <form onSubmit={handleSubmitRegister}>
              <div className="form-group pt-3">
                <label
                  htmlFor="email"
                  className="form-label label-inmersive-blue"
                >
                  Correo electrónico
                </label>
                <input
                  className="form-control"
                  type="text"
                  inputMode="email"
                  name="email"
                  id="email"
                  placeholder="Correo electrónico"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group pt-3">
                <label
                  htmlFor="password"
                  className="form-label label-inmersive-blue"
                >
                  Contraseña
                </label>
                <input
                  className="form-control"
                  type="password"
                  inputMode="text"
                  name="password"
                  id="password"
                  placeholder="Contraseña"
                  autoComplete="off"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group pt-3">
                <label>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    onClick={togglePassword}
                  />
                  Mostrar contraseña
                </label>
              </div>
              <Button
                id="submit"
                name="submit"
                text="Registrarse"
                className="btn btn-submit mt-4"
                type="submit"
              />
            </form>
            <div className="form-group pt-3">
              <Link to="/Login">
                ¿Ya tiene una cuenta con nosotros?
                <br />
                Inicie sesión aquí.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
