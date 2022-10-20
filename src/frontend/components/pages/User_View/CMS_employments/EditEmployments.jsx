import React, { useState } from "react";
import Swal from "sweetalert2";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../backend/Firebase/Firebase-config.js";

const EditEmployments = ({ task, platform, id }) => {
  const [tasks, setTasks] = useState([task]);
  const [platforms, setPlatforms] = useState([platform]);

  const updateTask = async (e) => {
    const regexLetter = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]/;
    const regexLinks =/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    e.preventDefault();
    try {
      if (!tasks || !platforms) {
        Swal.fire({
          title: "¡Atención!",
          icon: "info",
          text: "Ningún campo debe estar vacio",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1000,
        });
      } else if (!tasks.match(regexLetter)) {
        Swal.fire({
          title: "¡Atención!",
          icon: "info",
          text: "Ningún campo acepta carácteres especiales y/o números",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1000,
        });
      } else if (!platforms.match(regexLinks)) {
        Swal.fire({
          title: "¡Atención!",
          icon: "info",
          text: "El link de la plataforma es erroneo. Favor de verificarlo",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1000,
        });
      } else {
        const taskDocument = doc(db, "platforms", id);
        await updateDoc(taskDocument, {
          task: tasks,
          platform: platforms,
        });
        Swal.fire({
          title: "Éxito",
          icon: "success",
          text: "La bolsa de empleo se ha actualizado exitosamente",
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
                Editar plataformas
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
                    htmlFor="Title"
                  >
                    Titulo
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="form-control"
                    defaultValue={tasks}
                    onChange={(e) => setTasks(e.target.value)}
                  />
                </div>
                <div className="form-group pt-2">
                  <label
                    className="form-label label-inmersive-blue"
                    htmlFor="platforms"
                  >
                    Link
                  </label>
                  <input
                    type="text"
                    id="platforms"
                    name="platforms"
                    className="form-control"
                    defaultValue={platforms}
                    onChange={(e) => setPlatforms(e.target.value)}
                  />
                </div>
                <div className="form-group pt-2">
                  <button
                    type="button"
                    className="btn btn-submit"
                    onClick={(e) => updateTask(e)}
                  >
                    Actualizar plataformas
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

export default EditEmployments;
