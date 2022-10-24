import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import { Input, Button } from "../../../Indexes/AtomsIndexes";
import EditFaqs from "./EditFaqs";
import * as Routing from "../../../../assets/javascript/constants/routing/routing.js";
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
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 2;
  const pagesVisited = pageNumber * usersPerPage;

  const pageCount = Math.ceil(tasks.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
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
        // eslint-disable-next-line
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 col-md-6 faqs-left center">
            <h1>Manejador de FAQs</h1>
            <Link to={Routing.Home}>
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
              <div className="col-md-4 offset-md-4 pt-2">
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

              <div className="col-12 d-sm-block d-md-none pt-2">
                {tasks
                  .slice(pagesVisited, pagesVisited + usersPerPage)
                  .map(({ task, answer, id, timestamp }) => (
                    <div className="col-12 pt-2" key={id}>
                      <div className="card">
                        <div className="card-header">
                          <h1 className="text-center">{task}</h1>
                        </div>
                        <div className="card-body">
                          <p>{task}</p>
                          <p>{answer}</p>
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
                                />
                              </button>
                            </div>
                            <div className="col-6">
                              <EditFaqs task={task} answer={answer} id={id} />
                            </div>
                          </div>
                        </div>
                        <div className="card-footer">
                          {new Date(timestamp.seconds * 1000).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="col-12 pt-2 d-none d-md-block">
                <div className="table-responsive">
                  <table className="table table-hover table-bordered">
                    <thead>
                      <tr>
                        <th>Pregunta</th>
                        <th>Respuesta</th>
                        <th>Fecha de Creacion</th>
                        <th>Accion 1</th>
                        <th>Accion 2</th>
                      </tr>
                    </thead>
                    <tbody className="table-group-divider">
                      {tasks
                        .slice(pagesVisited, pagesVisited + usersPerPage)
                        .map(({ task, answer, id, timestamp }) => (
                          <tr key={id}>
                            <td>{task}</td>
                            <td>{answer}</td>
                            <td>
                              {new Date(
                                timestamp.seconds * 1000
                              ).toLocaleString()}
                            </td>
                            <td>
                              <EditFaqs task={task} answer={answer} id={id} />
                            </td>
                            <td>
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
                                />
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="col-12 pt-4">
                <ReactPaginate
                  breakLabel="..."
                  previousLabel={
                    <box-icon name="skip-previous" color="black" size="xs" />
                  }
                  nextLabel={
                    <box-icon name="skip-next" color="black" size="xs" />
                  }
                  pageCount={pageCount}
                  onPageChange={changePage}
                  containerClassName={"paginationBttns"}
                  previousLinkClassName={"previousBttn"}
                  nextLinkClassName={"nextBttn"}
                  disabledClassName={"paginationDisabled"}
                  activeClassName={"paginationActive"}
                />
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
