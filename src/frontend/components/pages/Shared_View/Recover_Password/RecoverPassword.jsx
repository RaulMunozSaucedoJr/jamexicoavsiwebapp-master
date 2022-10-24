import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Button, Input } from "../../../Indexes/AtomsIndexes.jsx";
import * as Routing from "../../../../assets/javascript/constants/routing/routing.js";
import { useForm } from "../../../../assets/javascript/hooks/useForm.js";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const initialForm = {
  email: "",
};
let regexEmail =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$/;

const validationsForm = (form) => {
  let errors = {};
  if (!form.email.trim()) {
    errors.email = "¡Este campo es OBLIGATORIO!";
  } else if (!regexEmail.test(form.email.trim())) {
    errors.email =
      "¡Favor de ingresar un formato de correo electronico valido!";
  }
  return errors;
};

const RecoverPassword = () => {
  const { form, errors, handleChange, handleBlur, handleSubmit } = useForm(
    initialForm,
    validationsForm
  );

  const auth = getAuth();
  const triggerResetEmail = async () => {
    try {
      if (!form.email) {
        Swal.fire({
          title: "¡Atención!",
          icon: "info",
          text: "Este campo NO debe de estar vacio\n. Favor de verificarlo",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 5000,
        });
      } else if (!form.email.match(regexEmail)) {
        Swal.fire({
          title: "¡Atención!",
          icon: "info",
          text: "El formato del correo electrónico es incorrecto. Favor de verificarlo.",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 7000,
        });
      } else {
        console.log(form.email);
        await sendPasswordResetEmail(auth, form.email);
        Swal.fire({
          title: "¡Éxito!",
          icon: "success",
          // eslint-disable-next-line
          text: "Se ha enviado el link para recuperación de contraseña al siguiente correo:\n"+`${form.email}`,
          showCancelButton: false,
          showConfirmButton: false,
          timer: 5000,
        });
        console.log("Password reset email sent");
        console.clear();
      }
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        Swal.fire({
          title: "¡Atención!",
          icon: "warning",
          // eslint-disable-next-line
          text: "El correo:\n"+`${form.email}\n`+"NO se encuentra registrado, por lo que no se podrá reestablecer la contraseña.\n Favor de registrarse para poder ingresar a la plataforma",
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
      }
      console.clear();
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 col-md-6 recover-left center">
            <h1>Recuperar contraseña</h1>
            <Link to={Routing.Home}>
              <Button
                className="btn btn-open"
                type="button"
                text="Volver al inicio"
              />
            </Link>
          </div>
          <div className="col-sm-12 col-md-6 recover-right">
            <div className="row">
              <div className="col-12 recover-right-1"></div>
              <div className="col-12 recover-right-2">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <Input
                      type="email"
                      name="email"
                      titleLabel="form-label label-inmersive-blue"
                      label="Correo electronico"
                      value={form.email}
                      autoComplete="off"
                      className="form-control"
                      placeholder="Correo electronico"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                    <div className="form-group pt-2">
                      {errors.email && <small>{errors.email}</small>}
                    </div>
                    <button
                      className="btn btn-submit mt-4"
                      type="submit"
                      onClick={triggerResetEmail}
                      value="Enviar"
                    >
                      Restaurar contrraseña
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecoverPassword;
