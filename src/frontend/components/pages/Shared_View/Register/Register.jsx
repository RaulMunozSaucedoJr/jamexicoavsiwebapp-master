import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Button } from "../../../Indexes/AtomsIndexes";
import * as Routing from "../../../../assets/javascript/constants/routing/routing.js";
import { UserAuth } from "../../../../context/AuthContext.js";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import app from "../../../../../backend/Firebase/Firebase-config";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatpassword, setRepeatPassword] = useState("");
  const [rol, setRol] = useState("");
  const [setError] = useState("");
  const { signUp } = UserAuth();
  let navigate = useNavigate();
  const firestore = getFirestore(app);

  const handleSubmitRegister = async (e) => {
    const regexEmail =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$/;
    let regexPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
    e.preventDefault();
    setError("");
    try {
      if (!email || !password || !rol || !repeatpassword) {
        Swal.fire({
          title: "¡Atención!",
          icon: "info",
          text: "Ningún campo debe de estar vacio. Favor de verificarlos",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 5000,
        });
      } else if (!email.match(regexEmail)) {
        Swal.fire({
          title: "¡Atención!",
          icon: "info",
          text: "El formato del correo electrónico  es invalido. Favor de verificarlo..",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 3000,
        });
      } else if (
        !password.match(regexPassword) ||
        !repeatpassword.match(regexPassword)
      ) {
        Swal.fire({
          title: "¡Atención!",
          icon: "info",
          text: "La contraseña deberá de tener: Mayúsculas, minúsculas, números y carácteres especiales con una longitud minima de 8. Favor de verificarlos",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 7000,
        });
      } else if (password !== repeatpassword) {
        Swal.fire({
          title: "¡Atención!",
          icon: "info",
          text: "Ambas contraseñas deben de coincidir. Favor de verificarlo",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 7000,
        });
      } else {
        const infoUsuario = await signUp(email, password, repeatpassword, rol);
        const docuRef = doc(firestore, `users/${infoUsuario.user.uid}`);
        setDoc(docuRef, { correo: email, password: password, repeatpassword:repeatpassword,  rol: rol });
        Swal.fire({
          title: "Éxito",
          icon: "success",
          // eslint-disable-next-line
          text:
            "Bienvenido:\n" +
            `${email}\n` +
            "Se le recuerda que tiene que completar su perfil de usuario.",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 4000,
        });
        navigate("/HomeAdmins");
      }
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        Swal.fire({
          title: "Error",
          icon: "error",
          // eslint-disable-next-line
          text:
            "El correo" +
            `${email}\n` +
            "ya se encuentra en uso.\n" +
            "Registrese ó reestablezca su contraseña.",
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
    const inputType = document.querySelector("#password");
    inputType.type === "password"
      ? (inputType.type = "text")
      : (inputType.type = "password");
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 col-md-6 register-left center">
            <h1>Registro</h1>
            <Link to={Routing.Login}>
              <Button
                type="button"
                text="Regresar al login"
                className="btn btn-submit"
              />
            </Link>
          </div>
          <div className="col-sm-12 col-md-6 register-right"></div>
          <div className="col-12 register-bottom">
            <form onSubmit={handleSubmitRegister}>
              <div className="form-group pt-1">
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
              <div className="form-group pt-1">
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
              <div className="form-group pt-1">
                <label
                  htmlFor="repeatpassword"
                  className="form-label label-inmersive-blue"
                >
                  Repetir Contraseña
                </label>
                <input
                  className="form-control"
                  type="password"
                  inputMode="text"
                  name="repeatpassword"
                  id="repeatpassword"
                  placeholder="Contraseña"
                  autoComplete="off"
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
              </div>
              <div className="form-group pt-1">
                <label
                  htmlFor="rol"
                  className="form-label label-inmersive-blue"
                >
                  Rol
                </label>
                <select
                  className="form-select"
                  name="rol"
                  id="rol"
                  onChange={(e) => setRol(e.target.value)}
                >
                  <option value="">Seleccione su rol</option>
                  <option value="user">Usuario</option>
                </select>
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
                disabled={!email || !password}
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
