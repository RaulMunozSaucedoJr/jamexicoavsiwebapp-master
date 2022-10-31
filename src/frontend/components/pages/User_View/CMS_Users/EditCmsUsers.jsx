import React, { useState } from "react";
import Swal from "sweetalert2";
import * as Regex from "../../../../assets/javascript/regexs/regexs";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../backend/Firebase/Firebase-config";

const EditCmsUsers = ({ email, password, rol, id }) => {
  const [emails, setEmails] = useState([email]);
  const [passwords, setPasswords] = useState([password]);
  const [rols, setRoles] = useState([rol]);

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      if (!emails || !passwords || !rols) {
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
      } else if (!password.match(Regex.Password)) {
        Swal.fire({
          title: "¡Atención!",
          icon: "info",
          text: "La contraseña deberá de tener: Mayúsculas, minúsculas, números y carácteres especiales con una longitud minima de 8. Favor de verificarlos",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 7000,
        });
      } else {
        const taskDocument = doc(db, "users", id);
        await updateDoc(taskDocument, {
          correo: emails, 
          password: passwords,
          rol: rols,
        });
        Swal.fire({
          title: "Éxito",
          icon: "success",
          text: "El usuario se ha actualizado exitosamente",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 2000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const togglePassword = () => {
    const inputType = document.querySelector("#passwordUpdate");
    inputType.type === "password"
      ? (inputType.type = "text")
      : (inputType.type = "password");
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-edit"
        data-bs-toggle="modal"
        data-bs-target={`#id${id}`}
      >
        <box-icon
          name="message-square-edit"
          type="solid"
          color="white"
          size="sm"
        ></box-icon>
      </button>

      <div
        className="modal fade"
        id={`id${id}`}
        tabIndex="-1"
        aria-labelledby="editLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title" id="editLabel">
                Editar usuario
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group pt-2">
                  <label
                    className="form-label label-inmersive-blue"
                    htmlFor="emailupdate"
                  >
                    Usuario
                  </label>
                  <input
                    type="text"
                    id="emailupdate"
                    className="form-control"
                    defaultValue={emails}
                    onChange={(e) => setEmails(e.target.value)}
                  />
                </div>
                <div className="form-group pt-2">
                  <label
                    className="form-label label-inmersive-blue"
                    htmlFor="passwordUpdate"
                  >
                    Contraseña
                  </label>
                  <input
                    type="password"
                    id="passwordUpdate"
                    placeholder="Contraseña"
                    className="form-control"
                    defaultValue={passwords}
                    autoComplete="off"
                    onChange={(e) => setPasswords(e.target.value)}
                  />
                </div>
                <div className="form-group pt-2">
                  <label
                    htmlFor="roleUpdate"
                    className="form-label label-white"
                  >
                    Rol
                  </label>
                  <select
                    className="form-select"
                    name="roleUpdate"
                    id="roleUpdate"
                    onChange={(e) => setRoles(e.target.value)}
                  >
                    <option defaultValue={rols}>Seleccione su rol</option>
                    <option value="user">Usuario</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>
                <div className="form-group pt-3">
                  <label>
                    <input
                      type="checkbox"
                      className="form-check-input text-white"
                      onClick={togglePassword}
                    />
                    Mostrar contraseña
                  </label>
                </div>
                <div className="form-group pt-2">
                  <button
                    type="button"
                    className="btn btn-submit"
                    onClick={(e) => updateUser(e)}
                  >
                    Actualizar usuarios
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCmsUsers;
