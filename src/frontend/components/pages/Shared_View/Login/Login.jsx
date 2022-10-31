import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as Regex from "../../../../assets/javascript/regexs/regexs";
import { Button } from "../../../Indexes/AtomsIndexes";
import { UserAuth } from "../../../../context/AuthContext.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rol] = useState("");
  const { logIn } = UserAuth();
  const navigate = useNavigate();
  const [isLogin] = useState(false);

  const handleSubmit = async (e) => {
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
          timer: 2500,
        });
      } else if (!email.match(Regex.Email)) {
        Swal.fire({
          title: "¡Atención!",
          icon: "info",
          text: "El formato del correo electrónico es incorrecto. Favor de verificarlo.",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 7000,
        });
      } else {
        if (!isLogin) {
          await logIn(email, password, rol);
          Swal.fire({
            icon: "success",
            title: `¡Bienvenido: ${email}`,
            text: "Se le recuerda que tiene que completar su perfil.",
            footer:"En caso de que ya lo haya completado, favor de ignorar este mensaje",
            showCancelButton: false,
            showConfirmButton: false,
            timer: 2500,
          });
          navigate("/HomeAdmins");
        }
      }
    } catch (err) {
      if (err.code === "auth/internal-error") {
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "Ha ocurrido un error en el servidor. \n Favor de comunicarlo al personal de TI mediante correo electrónico.",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 2500,
        });
      } else if (err.code === "auth/email-already-in-use") {
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "El correo electrónico ya se encuentra en uso. \n Favor de ingresar las credenciales correctas o reestablezca su contraseña",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 5000,
        });
      } else if (err.code === "auth/invalid-email") {
        Swal.fire({
          title: "¡Atención!",
          icon: "warning",
          text: "La contraseña y/o email son incorrectos. Favor de verificarlo",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 5000,
        });
      } else if (err.code === "auth/user-disabled") {
        Swal.fire({
          title: "¡Atención!",
          icon: "info",
          text: `El correo: ${email} se encuentra inactivo por el momento. \n Favor de contactar al servicio de ayuda para habilitar nuevamente su usuario`,
          showCancelButton: false,
          showConfirmButton: false,
          timer: 2500,
        });
      } else if (err.code === "auth/user-not-found") {
        Swal.fire({
          title: "¡Atención!",
          icon: "warning",
          // eslint-disable-next-line
          text: `El correo: ${email} electrónico NO se encuentra registrado. Favor de dirigirse a la secciòn de registro.`,
          showCancelButton: false,
          showConfirmButton: false,
          timer: 2500,
        });
      } else if (err.code === "auth/wrong-password") {
        Swal.fire({
          title: "¡Atención!",
          icon: "warning",
          text: "Correo electrónico y/o contraseña incorrecto(s). Favor de verificar sus credenciales.",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 2500,
        });
      }
      setError(err.message);
    }
  };

  const { googleSignIn, facebookSignIn, user } = UserAuth();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } finally {}
  };

  const handleFacebookSignIn = async () =>{
    try {
      await facebookSignIn();
    } finally {}
  }

  useEffect(() => {
    if (user != null) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);


  const togglePassword = () => {
    const x = document.getElementById("password");
    x.type === "password" ? (x.type = "email") : (x.type = "password");
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 col-md-6 login-left">
            <div className="row">
              <div className="col-sm-12 col-md-12">
                <h1>Ingresar</h1>
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
                <form onSubmit={handleSubmit} id="login" noValidate>
                  <div className="form-group pt-4">
                    <label htmlFor="user">Correo electrónico</label>
                    <input
                      placeholder="Correo electronico"
                      type="email"
                      className="form-control"
                      name="email"
                      id="email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group pt-4">
                    <label htmlFor="password">Contraseña</label>
                    <input
                      placeholder="Contraseña"
                      type="password"
                      className="form-control"
                      name="password"
                      id="password"
                      autoComplete="off"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group pt-4">
                    <label>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        onClick={togglePassword}
                      />
                      Mostrar contraseña
                    </label>
                  </div>
                  <div className="form-group pt-4">
                    <Link to="/RecoverPassword">Recuperar contraseña</Link>
                  </div>
                  <div className="form-group pt-4">
                    <Button
                      type="submit"
                      text="Login"
                      id="Login"
                      name="Login"
                      value={isLogin ? "Iniciar sesión" : "Iniciar sesión"}
                      className="btn btn-submit"
                      disabled={!email || !password}
                    />
                  </div>
                </form>
              </div>

              <div className="col-4 pt-2">
                <hr className="rounded" />
              </div>
              <div className="col-4 pt-2">
                <p>O ingresa con:</p>
              </div>
              <div className="col-4 pt-2">
                <hr className="rounded" />
              </div>

              <div className="col-sm-12 col-md-6 pt-2">
                <Button
                  id="modal"
                  text="Google"
                  className="btn btn-google mt-2"
                  type="button"
                  onClick={handleGoogleSignIn}
                />
              </div>
              <div className="col-sm-12 col-md-6 pt-2">
                <Button
                  id="modal"
                  text="Facebook"
                  className="btn btn-facebook mt-2"
                  type="button"
                  onClick={handleFacebookSignIn }
                />
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 login-right"></div>
        </div>
      </div>
    </>
  );
};

export default Login;
