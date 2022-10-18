import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Button } from "../../../Indexes/AtomsIndexes";
import app from "../../../../../backend/Firebase/Firebase-config.js";
import { getAuth, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { UserAuth } from "../../../../context/AuthContext.js";
const auth = getAuth(app);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    const regexPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
    e.preventDefault();
    setError("");
    try {
      if (!email && !password) {
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
          text: "La contraseña deberá de tener: Mayúsculas, minúsculas, nñumeros y carácteres especiales con una longitud minima de 8. Favor de verificarlos",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 7000,
        });
      } else {
        await logIn(email, password);
        Swal.fire({
          // eslint-disable-next-line
          title: "¡Bienvenido!\n" + `${email}`,
          text: "Gracias por ingresar a la plataforma",
          icon: "success",
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
          text: "El usuario se encuentra inactivo por el momento. Favor de contactar al servicio de ayuda para habilitar nuevamente su usuario",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 5000,
        });
      } else if (err.code === "auth/user-not-found") {
        Swal.fire({
          title: "¡Atención!",
          icon: "warning",
          text: "Este correo electrónico NO se encuentra registrado. Favor de dirigirse a la secciòn de registro y registrarlo.",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 5000,
        });
      } else if (err.code === "auth/weak-password") {
        Swal.fire({
          title: "¡Atención!",
          icon: "warning",
          text: "La contraseña y/o email son incorrectos. Favor de verificarlo",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 5000,
        });
      } else if (err.code === "auth/wrong-password") {
        Swal.fire({
          title: "¡Atención!",
          icon: "warning",
          text: "La contraseña no es la correcta. Favor de verificarla",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 5000,
        });
      }
      setError(err.message);
    }
  };

  const { googleSignIn, user } = UserAuth();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate("/Home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const signInWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then(
        (re) => {
          if (user != null) {
            navigate("/Home");
          }
          console.log(re);
        },
        [user]
      )
      .catch((err) => {
        console.log(err.message);
      });
  };

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
                <form
                  onSubmit={handleSubmit}
                  id="login"
                  className="needs-validation"
                  noValidate
                >
                  <div className="form-group pt-3">
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
                  <div className="form-group pt-3">
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
                  <div className="form-group pt-3">
                    <Link to="/RecoverPassword">Recuperar contraseña</Link>
                  </div>
                  <div className="form-group pt-3">
                    <Button
                      type="submit"
                      text="Login"
                      className="btn btn-submit"
                    />
                  </div>
                </form>
              </div>

              <div className="col-4 pt-4">
                <hr className="rounded" />
              </div>
              <div className="col-4 pt-4">
                <p>O ingresa con:</p>
              </div>
              <div className="col-4 pt-4">
                <hr className="rounded" />
              </div>

              <div className="col-sm-12 col-md-6 pt-3">
                <Button
                  id="modal"
                  text="Google"
                  className="btn btn-google mt-2"
                  type="button"
                  onClick={handleGoogleSignIn}
                />
              </div>
              <div className="col-sm-12 col-md-6 pt-3">
                <Button
                  id="modal"
                  text="Facebook"
                  className="btn btn-facebook mt-2"
                  type="button"
                  onClick={signInWithFacebook}
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
