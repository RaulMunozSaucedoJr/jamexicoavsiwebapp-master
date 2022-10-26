import React, { useState } from "react";
import Swal from "sweetalert2";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../backend/Firebase/Firebase-config";

const EditCmsUsers = ({ email, password, rol, id }) => {
  const [emails, setEmails] = useState([email]);
  const [passwords, setPasswords] = useState([password]);
  const [rols, setRoles] = useState([rol]);

  const updateUser = async (e) => {
    const regexEmail =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$/;
    let regexPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
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
      } else if (!email.match(regexEmail)) {
        Swal.fire({
          title: "¡Atención!",
          icon: "info",
          text: "El formato del correo electrónico  es invalido. Favor de verificarlo..",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 3000,
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
                    htmlFor="userupdate"
                  >
                    Usuario
                  </label>
                  <input
                    type="text"
                    id="userupdate"
                    className="form-control"
                    defaultValue={emails}
                    onChange={(e) => setEmails(e.target.value)}
                  />
                </div>
                <div className="form-group pt-2">
                  <label
                    className="form-label label-inmersive-blue"
                    htmlFor=""
                  >
                    Categoria
                  </label>
                  <input
                    type="password"
                    id=""
                    placeholder="Contraseña"
                    className="form-control"
                    defaultValue={passwords}
                    autoComplete="off"
                    onChange={(e) => setPasswords(e.target.value)}
                  />
                </div>
                <div className="form-group pt-2">
                  <label
                    className="form-label label-inmersive-blue"
                    htmlFor=""
                  >
                    Rol
                  </label>
                  <input
                    type="text"
                    id=""
                    placeholder="Rol"
                    className="form-control"
                    defaultValue={rols}
                    onChange={(e) => setRoles(e.target.value)}
                  />
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
