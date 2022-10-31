import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import { Button, Input } from "../../../Indexes/AtomsIndexes";
import EditTips from "./EditTips";
import * as Routing from "../../../../assets/javascript/constants/routing/routing.js";
import * as Regex from "../../../../assets/javascript/regexs/regexs";
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

const CmsTips = () => {
  const [tasks, setTasks] = useState([]);
  const [createTask, setCreateTask] = useState("");
  const [createCategory, setCategory] = useState("");
  const [createContent, setContent] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 2;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(tasks.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const collectionRef = collection(db, "tips");

  const submitTask = async (e) => {
    e.preventDefault();
    try {
      if (!createTask || !createCategory || !createContent) {
        Swal.fire({
          title: "¡Atención!",
          icon: "info",
          text: "Ningún campo debe estar vacio",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1000,
        });
      } else if (
        !createTask.match(Regex.Letters) ||
        !createCategory.match(Regex.Letters) ||
        !createContent.match(Regex.Letters)
      ) {
        Swal.fire({
          title: "¡Atención!",
          icon: "info",
          text: "Ninguno de estos campos acepta carácteres especiales y/o números.",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 2500,
        });
      } else {
        await addDoc(collectionRef, {
          task: createTask,
          category: createCategory,
          content: createContent,
          timestamp: serverTimestamp(),
        });
        Swal.fire({
          title: "Éxito",
          icon: "success",
          text: "El tip se registró exitosamente",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location.reload();
        }, 700);
      }
    } catch (err) {
      Swal.fire({
        title: "¡Atención!",
        icon: "error",
        text: `El tip no se ha podido registrar \n Favor de enviar el error: ${err} al equipo de soporte`,
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
      const documentRef = doc(db, "tips", id);
      await deleteDoc(documentRef);
      Swal.fire({
        title: "Éxito",
        icon: "success",
        text: "El post se eliminó exitosamente",
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
        text: `El post no se ha podido eliminar.\n Favor de mencionar el siguiente error: ${err} al equipo de TI.`,
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
          <div className="col-sm-12 col-md-6 tips-left center">
            <h1>Manejador de tips laborales</h1>
            <Link to={Routing.Home}>
              <Button
                id="button"
                text="Volver al inicio"
                className="btn btn-open"
                type="button"
              />
            </Link>
          </div>
          <div className="col-sm-12 col-md-6 tips-right"></div>
          <div className="col-sm-12 col-md-12 tips-bottom">
            <div className="row">
              <div className="col-md-4 offset-md-4 col pt-4">
                <button
                  className="btn btn-open"
                  id="button"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#addModal"
                >
                  Agregar tips
                </button>
              </div>
              <div className="col-12 pt-2 d-sm-block d-md-none">
                {tasks.length === 0 ? (
                  <div className="alert alert-warning text-center" role="alert">
                    <h4>
                      <strong>¡No hay tips registrados!.</strong>
                    </h4>
                    <p>
                      <strong>
                        Favor de registrar los tips para tu primer empleo que
                        considere necesarios
                      </strong>
                    </p>
                  </div>
                ) : (
                  tasks
                    .slice(pagesVisited, pagesVisited + usersPerPage)
                    .map(({ task, category, content, id, timestamp }) => (
                      <div className="col-12" key={id}>
                        <div className="card">
                          <div className="card-body">
                            <div className="card-header">
                              <h1 className="text-center">{task}</h1>
                            </div>
                            <h3>Categoría:</h3>
                            <p>{category}</p>
                            <h3>Contenido:</h3>
                            <p>{content}</p>
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
                                <EditTips
                                  task={task}
                                  category={category}
                                  content={content}
                                  id={id}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="card-footer">
                            <small>
                              Fecha de creación/modificaciòn:
                              <br />
                              {new Date(
                                timestamp.seconds * 1000
                              ).toLocaleString()}
                            </small>
                          </div>
                        </div>
                      </div>
                    ))
                )}
              </div>

              <div className="col-12 pt-2 d-none d-md-block">
                <div className="table-responsive">
                  <table className="table table-hover table-bordered">
                    <thead>
                      <tr>
                        <th>Titulo</th>
                        <th>Categoria</th>
                        <th>Contenido</th>
                        <th>Fecha de Creacion</th>
                        <th>Accion 1</th>
                        <th>Accion 2</th>
                      </tr>
                    </thead>
                    <tbody className="table-group-divider">
                      {tasks
                        .slice(pagesVisited, pagesVisited + usersPerPage)
                        .map(({ task, category, content, id, timestamp }) => (
                          <tr key={id}>
                            <td>{task}</td>
                            <td>{category}</td>
                            <td>{content}</td>
                            <td>
                              {new Date(
                                timestamp.seconds * 1000
                              ).toLocaleString()}
                            </td>
                            <td>
                              <EditTips
                                task={task}
                                category={category}
                                content={content}
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
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="col-12 pt-4">
                <ReactPaginate
                  breakLabel="..."
                  previousLabel={
                    <box-icon name="skip-previous" color="white" size="sm" />
                  }
                  nextLabel={
                    <box-icon name="skip-next" color="white" size="sm" />
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
                Añadir tips
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
                    label="Categoria"
                    type="text"
                    className="form-control"
                    name="category"
                    id="category"
                    placeholder="Categoria"
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="content"
                    className="form-label label-inmersive-blue"
                  >
                    Contenido
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    name="content"
                    id="content"
                    placeholder="Contenido"
                    onChange={(e) => setContent(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group pt-2">
                  <button className="btn btn-submit" type="submit">
                    Crear post
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

export default CmsTips;
