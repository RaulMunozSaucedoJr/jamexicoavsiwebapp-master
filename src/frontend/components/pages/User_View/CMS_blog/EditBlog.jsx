import React, { useState } from "react";
import Swal from "sweetalert2";
import * as Regex from "../../../../assets/javascript/regexs/regexs";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../backend/Firebase/Firebase-config.js";

const EditTask = ({ task, category, content, id }) => {
  const [tasks, setTasks] = useState([task]);
  const [categorys, setCategory] = useState([category]);
  const [contents, setContent] = useState([content]);

  const updateTask = async (e) => {
    e.preventDefault();
    try {
      if (!tasks || !categorys || !contents) {
        Swal.fire({
          title: "¡Atención!",
          icon: "info",
          text: "Ningún campo debe estar vacio",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1000,
        });
      } else if (
        !tasks.match(Regex.Letters) ||
        !categorys.match(Regex.Letters) ||
        !contents.match(Regex.Letters)
      ) {
        Swal.fire({
          title: "¡Atención!",
          icon: "info",
          text: "Ningún campo acepta carácteres especiales y/o números",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1000,
        });
      } else {
        const taskDocument = doc(db, "tasks", id);
        await updateDoc(taskDocument, {
          task: tasks,
          category: categorys,
          content: contents,
        });
        Swal.fire({
          title: "Éxito",
          icon: "success",
          text: "El post se ha actualizado exitosamente",
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
                Editar post
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
                    htmlFor="category"
                  >
                    Categoria
                  </label>
                  <input
                    type="text"
                    id="category"
                    placeholder="Categoria"
                    className="form-control"
                    defaultValue={categorys}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
                <div className="form-group pt-2">
                  <label
                    className="form-label label-inmersive-blue"
                    htmlFor="content"
                  >
                    Contenido
                  </label>
                  <textarea
                    type="text"
                    id="content"
                    placeholder="Contenido"
                    className="form-control"
                    defaultValue={contents}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                <div className="form-group pt-2">
                  <button
                    type="button"
                    className="btn btn-submit"
                    onClick={(e) => updateTask(e)}
                  >
                    Actualizar posts
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

export default EditTask;
