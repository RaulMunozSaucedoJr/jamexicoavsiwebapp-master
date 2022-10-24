import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import { Button, Input, TextArea } from "../../../Indexes/AtomsIndexes";
import * as Routing from "../../../../assets/javascript/constants/routing/routing.js";
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
  const [createDescription, setCreateDescription] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 2;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(tasks.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const collectionRef = collection(db, "platforms");

  //Add Task Handler
  const submitTask = async (e) => {
    const regexLetter = /^[a-zA-ZÀ-ÿ\0-9\u00f1\u00d1\s]/;
    const regexLinks =
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    e.preventDefault();
    try {
      if (!createTask || !createLink || !createDescription) {
        Swal.fire({
          title: "¡Atención!",
          icon: "info",
          text: "Ningún campo debe estar vacio",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1000,
        });
      } else if (
        !createTask.match(regexLetter) ||
        !createDescription.match(regexLetter)
      ) {
        Swal.fire({
          title: "¡Atención!",
          icon: "info",
          text: "El campo nombre y des",
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
          description: createDescription,
          timestamp: serverTimestamp(),
        });
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "La bolsa de empleo se registró exitosamente",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (err) {
      Swal.fire({
        icon: "warning",
        title: "¡Atención!",
        // eslint-disable-next-line
        text:
          "La bolsa de empleo NO se ha podido registrar.\n" +
          `Favor de mencionar el siguiente error: ${err} al equipo de TI.`,
        showCancelButton: false,
        showConfirmButton: false,
        timer: 1500,
      });
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
        timer: 1000,
      });
      setTimeout(() => {
        window.location.reload();
      }, 500);
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
            <Link to={Routing.Home}>
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
              <div className="col-md-4 offset-md-4 pt-2">
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

              <div className="col-12 d-sm-block d-md-none pt-2">
                {tasks
                  .slice(pagesVisited, pagesVisited + usersPerPage)
                  .map(({ task, platform, description, id, timestamp }) => (
                    <div className="col-12 pt-2" key={id}>
                      <div className="card">
                        <div className="card-header">
                          <h1>{task}</h1>
                        </div>
                        <div className="card-body">
                          <p>{description}</p>
                          <h6>
                            <a
                              rel="nofollow noopener noreferrer"
                              href={platform}
                            >
                              <span className="badge badge-link">
                                {platform}
                              </span>
                            </a>
                          </h6>
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
                              <EditEmployments
                                task={task}
                                platform={platform}
                                description={description}
                                id={id}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="card-footer">
                          Fecha de creacion:
                          <br />
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
                        <th>Titulo</th>
                        <th>Plataforma</th>
                        <th>Descripcion</th>
                        <th>Fecha de Creacion</th>
                        <th>Accion 1</th>
                        <th>Accion 2</th>
                      </tr>
                    </thead>
                    <tbody className="table-group-divider">
                      {tasks
                        .slice(pagesVisited, pagesVisited + usersPerPage)
                        .map(
                          ({ task, platform, description, id, timestamp }) => (
                            <tr key={id}>
                              <td>{task}</td>
                              <td className="center">
                                <h4>
                                  <a
                                    rel="nofollow noopener noreferrer"
                                    href={platform}
                                  >
                                    <span className="badge bg-success">
                                      {platform}
                                    </span>
                                  </a>
                                </h4>
                              </td>
                              <td>{description}</td>
                              <td>
                                {new Date(
                                  timestamp.seconds * 1000
                                ).toLocaleString()}
                              </td>
                              <td>
                                <EditEmployments
                                  task={task}
                                  platform={platform}
                                  description={description}
                                  id={id}
                                />
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
                          )
                        )}
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
                  <TextArea
                    titleLabel="form-label label-inmersive-blue"
                    label="Descripción"
                    type="text"
                    className="form-control"
                    name="description"
                    id="description"
                    placeholder="Descripción"
                    onChange={(e) => setCreateDescription(e.target.value)}
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
                  <Button
                    type="submit"
                    className="btn btn-submit"
                    text="Agregar bolsa de empleo"
                  />
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
