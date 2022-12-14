import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Button } from "../../../Indexes/AtomsIndexes";
import * as Routing from "../../../../assets/javascript/constants/routing/routing.js";
import * as Regex from "../../../../assets/javascript/regexs/regexs";
import { UserAuth } from "../../../../context/AuthContext.js";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";
import app from "../../../../../backend/Firebase/Firebase-config";

const Register = () => {
  /* A hook that allows us to use state in functional components. */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatpassword, setRepeatPassword] = useState("");
  const [rol, setRol] = useState("user"); 
  /* A hook that allows us to use state in functional components. */
  // eslint-disable-next-line
  const [error, setError] = useState("");
  const { signUp } = UserAuth();
  let navigate = useNavigate();
  const firestore = getFirestore(app);

  /**
   * A function that is responsible for validating the data entered by the user in the form, and if it
   * is correct, it will be registered in the database.
   */
  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (!email || !password || !repeatpassword) {
        Swal.fire({
          title: "¡Atención!",
          icon: "info",
          text: "Ningún campo debe de estar vacio. Favor de verificarlos",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 5000,
        });
      } else if (!email.match(Regex.Email)) {
        Swal.fire({
          title: "¡Atención!",
          icon: "info",
          text: "El formato del correo electrónico  es invalido. Favor de verificarlo..",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 3000,
        });
      } else if (
        !password.match(Regex.Password) ||
        !repeatpassword.match(Regex.Password)
      ) {
        Swal.fire({
          title: "¡Atención!",
          icon: "info",
          text: "La contraseña deberá de tener: \n Mayúsculas, minúsculas, números y carácteres especiales con una longitud minima de 8. Favor de verificarlos",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 3000,
        });
      } else if (password !== repeatpassword) {
        Swal.fire({
          title: "¡Atención!",
          icon: "info",
          text: "Ambas contraseñas deben de coincidir. Favor de verificarlo",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 3000,
        });
      } else {
        const infoUsuario = await signUp(email, password, repeatpassword, rol);
        const docuRef = doc(firestore, `users/${infoUsuario.user.uid}`);
        setDoc(docuRef, {
          uid: infoUsuario.user.uid,
          correo: email,
          password: password,
          repeatpassword: repeatpassword,
          rol: rol,
          timestamp: serverTimestamp(),
        });
        Swal.fire({
          title: "Éxito",
          icon: "success",
          text: `Bienvenido: ${email}. Se le recuerda que tiene que completar su perfil de usuario en el menu Crear.`,
          showCancelButton: false,
          showConfirmButton: false,
          timer: 8000,
        });
        navigate("/Resume");
      }
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        Swal.fire({
          title: "Error",
          icon: "error",
          text: `El correo ${email} ya se encuentra en uso. \n Registrese ó reestablezca su contraseña.`,
          showCancelButton: false,
          showConfirmButton: false,
          timer: 3000,
        });
      } else if (err.code === "auth/invalid-email") {
        Swal.fire({
          title: "¡Atención!",
          icon: "warning",
          text: "El formato del correo electrónico es incorrecto. \n Favor de verificarlo",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 3000,
        });
      } else if (err.code === "auth/weak-password") {
        Swal.fire({
          title: "¡Atención!",
          icon: "warning",
          text: "El formato de la contraseña deberá de tener: Mayúsculas, minúsculas, números y carácteres especiales con una longitud de 6. Favor de verificarlo",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 3000,
        });
      }
      setError(err.message);
    }
    console.clear();
  };

  /**
   * If the input type is password, change it to text, otherwise change it to password
   */
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
            <Link to={Routing.Home}>
              <Button
                type="button"
                text="Regresar al inicio"
                className="btn btn-open"
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
                  placeholder="Repetir contraseña"
                  autoComplete="off"
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
              </div>
              <div className="form-group pt-1 d-none" id="divrolregistro">
                <label
                  htmlFor="rolregistro"
                  className="form-label label-inmersive-blue d-none"
                >
                  Rol
                </label>
                <input
                  className="form-select"
                  name="rolregistro"
                  id="rolregistro"
                  value={rol}
                  readOnly
                  onChange={(e) => setRol(e.target.value)}
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
                className="btn btn-submit mt-2"
                type="submit"
                disabled={!email || !password || !repeatpassword}
              />
            </form>
            <div className="form-group pt-3">
              <Link to="/Login">
                ¿Ya tiene una cuenta con nosotros? Inicie sesión aquí.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
