import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Input, Button } from "../../../Indexes/AtomsIndexes";
import EditFaqs from "./EditFaqs";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../../../../backend/Firebase/Firebase-config.js";

const CmsFaqs = () => {
  const [tasks, setTasks] = useState([]);
  const [createTask, setCreateTask] = useState("");
  const [createAnswer, setCreateAnswer] = useState("");
  const collectionRef = collection(db, "faqs");

  //Add Task Handler
  const submitTask = async (e) => {
    // eslint-disable-next-line
    const regexQuestion = /^\¿.*?\?$/;
    const regexAnswer = /^[a-zA-ZÀ-ÿ\0-9\u00f1\u00d1\s]/;
    e.preventDefault();
    try {
      if (!createTask || !createAnswer) {
        Swal.fire({
          title: "¡Atención!",
          icon: "info",
          text: "Ningún campo debe estar vacio",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1000,
        });
      } else if (!createTask.match(regexQuestion)) {
        Swal.fire({
          title: "¡Atención!",
          icon: "info",
          text: "La pregunta debe de tener ambos signos de interrogacion. Favor de verificarlo",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1000,
        });
      } else if (!createAnswer.match(regexAnswer)) {
        Swal.fire({
          title: "¡Atención!",
          icon: "info",
          text: "La respuesta NO acepta carácteres especiales",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1000,
        });
      } else {
        await addDoc(collectionRef, {
          task: createTask,
          answer: createAnswer,
          timestamp: serverTimestamp(),
        });
        Swal.fire({
          title: "Éxito",
          icon: "success",
          text: "La pregunta y respuesta se registrarón exitosamente",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //Delete Handler
  const deleteTask = async (id) => {
    try {
      const documentRef = doc(db, "faqs", id);
      await deleteDoc(documentRef);
      Swal.fire({
        title: "Éxito",
        icon: "success",
        text: "La pregunta frecuente se eliminó exitosamente",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      Swal.fire({
        title: "¡Atención!",
        icon: "warning",
        text:
          "La pregunta frecuente no se ha podido eliminar.\n" +
          `Favor de mencionar el siguiente error: ${err} al equipo de TI.`,
        showCancelButton: false,
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(err);
    }
  };

  //Query the collection
  useEffect(() => {
    const getTasks = async () => {
      const q = query(collectionRef, orderBy("timestamp"));
      await getDocs(q)
        .then((tasks) => {
          let tasksData = tasks.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setTasks(tasksData);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getTasks();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 col-md-6 faqs-left center">
            <h1>Manejador de FAQs</h1>
            <Link to="/Home">
              <Button
                id="button"
                text="Volver al inicio"
                className="btn btn-open"
                type="button"
              />
            </Link>
          </div>
          <div className="col-sm-12 col-md-6 faqs-right"></div>
          <div className="col-sm-12 col-md-12 faqs-bottom">
            <div className="row">
              <div className="col-12 pt-2">
                <button
                  className="btn btn-open"
                  id="button"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#addModal"
                >
                  Agregar preguntas frecuentes
                </button>
              </div>

              {/*ACCORDION WITH RECORDS*/}
              <div className="col-12 d-sm-block d-md-none pt-2">
                {tasks.map(({ task, answer, id, timestamp }) => (
                  <div
                    className="accordion"
                    id="accordionPanelsStayOpenExample"
                    key={id}
                  >
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingOne">
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#panelsStayOpen-collapseOne"
                          aria-expanded="true"
                          aria-controls="panelsStayOpen-collapseOne"
                        >
                          {task}
                        </button>
                      </h2>
                      <div
                        id="panelsStayOpen-collapseOne"
                        className="accordion-collapse collapse show"
                        aria-labelledby="panelsStayOpen-headingOne"
                      >
                        <div className="accordion-body">
                          <strong>{task}</strong>
                          <p>{answer}</p>
                          <p>
                            {new Date(
                              timestamp.seconds * 1000
                            ).toLocaleString()}
                          </p>
                          <div className="container-fluid">
                            <div className="row">
                              <div className="col-6">
                                <button
                                  type="button"
                                  className="btn btn-delete"
                                  onClick={() => deleteTask(id)}
                                >
                                  <box-icon
                                    name="message-square-x"
                                    type="solid"
                                    color="white"
                                    size="sm"
                                  ></box-icon>
                                </button>
                              </div>
                              <div className="col-6">
                                <EditFaqs task={task} answer={answer} id={id} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="addModal"
        tabIndex="-1"
        aria-labelledby="addModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title" id="addModalLabel">
                Añadir preguntas frecuentes
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form onSubmit={submitTask}>
                <div className="form-group">
                  <Input
                    titleLabel="form-label label-inmersive-blue"
                    label="Pregunta"
                    type="text"
                    className="form-control"
                    name="question"
                    id="question"
                    placeholder="Pregunta"
                    onChange={(e) => setCreateTask(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <Input
                    titleLabel="form-label label-inmersive-blue"
                    label="Respuesta"
                    type="text"
                    className="form-control"
                    name="answer"
                    id="answer"
                    placeholder="Respuesta"
                    onChange={(e) => setCreateAnswer(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group pt-2">
                  <button className="btn btn-submit" type="submit">
                    Agregar preguntas frecuentes
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

export default CmsFaqs;
