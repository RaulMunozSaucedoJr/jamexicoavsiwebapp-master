import React, { useState } from "react";
import Swal from "sweetalert2";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../backend/Firebase/Firebase-config.js";

const EditFaqs = ({ task, answer, id }) => {
  const [tasks, setTasks] = useState([task]);
  const [answers, setAnswers] = useState([answer]);
  const updateTask = async (e) => {
    // eslint-disable-next-line
    const regexQuestion = /^\¿.*?\?$/;
    const regexAnswer = /^[a-zA-ZÀ-ÿ\0-9\u00f1\u00d1\s]/;
    e.preventDefault();
    try {
      if (!tasks || !answers) {
        Swal.fire({
          title: "¡Atención!",
          icon: "info",
          text: "Ningún campo debe estar vacio",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1000,
        });
      } else if (!tasks.match(regexQuestion)) {
        Swal.fire({
          title: "¡Atención!",
          icon: "info",
          text: "La pregunta debe de tener ambos signos de interrogacion. Favor de verificarlo",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1000,
        });
      } else if (!answers.match(regexAnswer)) {
        Swal.fire({
          title: "¡Atención!",
          icon: "info",
          text: "La respuesta NO acepta carácteres especiales. Favor de verificarlo",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1000,
        });
      } else {
        const taskDocument = doc(db, "faqs", id);
        await updateDoc(taskDocument, {
          task: tasks,
          answer: answers,
        });
        Swal.fire({
          title: "Éxito",
          icon: "success",
          text: "La pregunta frecuente se ha actualizado exitosamente",
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
                Editar preguntas frecuentes
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
                    htmlFor="question"
                  >
                    Pregunta
                  </label>
                  <input
                    type="text"
                    id="question"
                    name="question"
                    placeholder="Pregunta"
                    className="form-control"
                    defaultValue={tasks}
                    onChange={(e) => setTasks(e.target.value)}
                  />
                </div>
                <div className="form-group pt-2">
                  <label
                    className="form-label label-inmersive-blue"
                    htmlFor="answer"
                  >
                    Respuesta
                  </label>
                  <input
                    type="text"
                    id="answer"
                    name="answer"
                    placeholder="Respuesta"
                    className="form-control"
                    defaultValue={answers}
                    onChange={(e) => setAnswers(e.target.value)}
                  />
                </div>
                <div className="form-group pt-2">
                  <button
                    type="button"
                    className="btn btn-submit"
                    onClick={(e) => updateTask(e)}
                  >
                    Actualizar preguntas frecuentes
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

export default EditFaqs;
