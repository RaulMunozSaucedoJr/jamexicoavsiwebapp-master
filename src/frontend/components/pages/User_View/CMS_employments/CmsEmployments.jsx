import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Button, Input } from "../../../Indexes/AtomsIndexes";
import EditEmployments from "./EditEmployments";
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

const CmsEmployments = () => {
  const [tasks, setTasks] = useState([]);
  const [createTask, setCreateTask] = useState("");
  const [createLink, setCreateLink] = useState("");
  const collectionRef = collection(db, "platforms");

  //Add Task Handler
  const submitTask = async (e) => {
    const regexLetter = /^[a-zA-ZÀ-ÿ\0-9\u00f1\u00d1\s]/;
    const regexLinks =
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    e.preventDefault();
    try {
      if (!createTask || !createLink) {
        Swal.fire({
          title: "¡Atención!",
          icon: "info",
          text: "Ningún campo debe estar vacio",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1000,
        });
      } else if (!createTask.match(regexLetter)) {
        Swal.fire({
          title: "¡Atención!",
          icon: "info",
          text: "El campo nombre y descripción NO aceptan números",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 2000,
        });
      } else if (!createLink.match(regexLinks)) {
        Swal.fire({
          title: "¡Atención!",
          icon: "info",
          text: "La dirección web de la plataforma de empleo tiene un formato incorrecto. Favor de verificarla",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        await addDoc(collectionRef, {
          task: createTask,
          platform: createLink,
          timestamp: serverTimestamp(),
        });
        Swal.fire({
          title: "Éxito",
          icon: "success",
          text: "La bolsa de empleo se registró exitosamente",
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
      const documentRef = doc(db, "platforms", id);
      await deleteDoc(documentRef);
      Swal.fire({
        title: "Éxito",
        icon: "success",
        text: "La bolsa de empleo se eliminó exitosamente",
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
          "La bolsa de empleo no se ha podido eliminar.\n" +
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
          <div className="col-sm-12 col-md-6 employments-left center">
            <h1>Manejador de empleos</h1>
            <Link to="/Home">
              <Button
                id="button"
                text="Volver al inicio"
                className="btn btn-open"
                type="button"
              />
            </Link>
          </div>

          <div className="col-sm-12 col-md-6 employments-right"></div>

          <div className="col-sm-12 col-md-12 employments-bottom">
            <div className="row">
              <div className="col-12 pt-2">
                <button
                  className="btn btn-open"
                  id="button"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#addModal"
                >
                  Agregar bolsa de empleo
                </button>
              </div>

              {/*ACCORDION WITH RECORDS*/}
              <div className="col-12 d-sm-block d-md-none pt-2">
                {tasks.map(({ task, platform, id, timestamp }) => (
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
                          <br />
                          <a href={platform} target="_blank" rel="noreferrer">
                            {platform}
                          </a>
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
                                <EditEmployments
                                  task={task}
                                  platform={platform}
                                  id={id}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/*TABLE WITH RECORDS*/}
              {/*<div className="col-12 pt-4 d-sm-none d-md-block d-none">
                <div className="table-responsive">
                  <table className="table table-hover table-striped table-bordered">
                    <thead>
                      <tr>
                        <th>Titulo</th>
                        <th>Categoria</th>
                        <th>Contenido</th>
                        <th>Fecha</th>
                        <th>Accion 1</th>
                        <th>Accion 2</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tasks.map(
                        ({ task, category, content, id, timestamp }) => (
                          <tr scope="row" key={id}>
                            <td>{task}</td>
                            <td>{category}</td>
                            <td>{content}</td>
                            <td>
                              {new Date(
                                timestamp.seconds * 1000
                              ).toLocaleString()}
                            </td>
                            <td>
                              <EditBlog content={content} task={task} id={id} />
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
                                ></box-icon>
                              </button>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>*/}
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
                Añadir plataformas
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
                    label="Titulo"
                    type="text"
                    className="form-control"
                    name="title"
                    id="title"
                    placeholder="Titulo"
                    onChange={(e) => setCreateTask(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <Input
                    titleLabel="form-label label-inmersive-blue"
                    label="Link"
                    type="text"
                    className="form-control"
                    name="url"
                    id="url"
                    placeholder="Link"
                    onChange={(e) => setCreateLink(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group pt-2">
                  <button className="btn btn-submit" type="submit">
                    Agregar plataformas
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

export default CmsEmployments;
