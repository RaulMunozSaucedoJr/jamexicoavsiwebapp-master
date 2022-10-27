import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import { Button } from "../../../Indexes/AtomsIndexes";
import EditCmsUsers from "./EditCmsUsers";
import * as Routing from "../../../../assets/javascript/constants/routing/routing.js";
import { UserAuth } from "../../../../context/AuthContext";
import { db } from "../../../../../backend/Firebase/Firebase-config";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { getFirestore, setDoc } from "firebase/firestore";
import app from "../../../../../backend/Firebase/Firebase-config";

const CmsUsers = () => { 
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("");
  const [error, setError] = useState("");
  const { signUp } = UserAuth();

  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 2;
  const pagesVisited = pageNumber * usersPerPage;

  const pageCount = Math.ceil(users.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const collectionRef = collection(db, "users");

  const firestore = getFirestore(app);

  const handleSubmitRegister = async (e) => {
    const regexEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$/;
    let regexPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
    e.preventDefault();
    setError("");
    try {
      if (!email || !password || !rol) {
        Swal.fire({
          title: "¡Atención!",
          icon: "info",
          text: "Ningún campo debe estar vacio",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1000,
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
          text: "El formato de la contraseña es incorrecto. La contraseña deberá de tener Mayúsculas, minúsculas, números y carácteres especiales con una longitud minima de 8 carácteres.",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 4000,
        });
      } else {
        const infoUsuario = await signUp(email, password, rol);
        const docuRef = doc(firestore, `users/${infoUsuario.user.uid}`);
        setDoc(docuRef, {
          email: email,
          password: password,
          rol: rol,
          timestamp: serverTimestamp(),
        });
        Swal.fire({
          title: "Éxito",
          icon: "success",
          // eslint-disable-next-line
          text: "Registro exitóso",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 4000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 700);
      }
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        Swal.fire({
          title: "Error",
          icon: "error",
          // eslint-disable-next-line
          text:
            "El correo" +
            `${email}\n` +
            "ya se encuentra en uso.\n" +
            "Registrese ó reestablezca su contraseña.",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 5000,
        });
      } else if (err.code === "auth/invalid-email") {
        Swal.fire({
          title: "¡Atención!",
          icon: "warning",
          text: "El formato del correo electrónico es incorrecto. Favor de verificarlo",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 5000,
        });
      } else if (err.code === "auth/weak-password") {
        Swal.fire({
          title: "¡Atención!",
          icon: "warning",
          text: "El formato de la contraseña deberá de tener: Mayúsculas, minúsculas, números y carácteres especiales con una longitud de 6. Favor de verificarlo",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 5000,
        });
      } else if (err.code === "auth/account-exists-with-different-credential") {
        Swal.fire({
          title: "¡Atención!",
          icon: "warning",
          text: "Ya existe una cuenta con este email relacionado a una red social\n. Por favor, trate de ingresar con su correo personal",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 5000,
        });
      }
      setError(err.message);
    }
  };

  //Delete Handler
  const deleteUser = async (id) => {
    try {
      const documentRef = doc(db, "users", id);
      await deleteDoc(documentRef);
      Swal.fire({
        title: "Éxito",
        icon: "success",
        text: "El usuario se eliminó exitosamente",
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
          "El usuario no se ha podido eliminar.\n" +
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
    const getUsers = async () => {
      const q = query(collectionRef, orderBy("timestamp"));
      await getDocs(q)
        .then((users) => {
          let usersData = users.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setUsers(usersData);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const togglePassword = () => {
    const inputType = document.querySelector("#password");
    inputType.type === "password"
      ? (inputType.type = "text")
      : (inputType.type = "password");
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 col-md-6 cms-user-left center">
            <h1>Administrador de usuarios</h1>
            <Link to={Routing.Home}>
              <Button
                type="button"
                text="Regresar al inicio"
                className="btn btn-open"
              />
            </Link>
          </div>
          <div className="col-sm-12 col-md-6 cms-user-right"></div>
          <div className="col-sm-12 col-md-12 cms-user-bottom">
            <div className="row">
              <div className="col-md-4 offset-md-4 col pt-4">
                <button
                  className="btn btn-open"
                  id="button"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#addModal"
                >
                  Agregar usuario
                </button>
              </div>

              <div className="col-12 pt-2 d-sm-block d-md-none">
                {users
                  .slice(pagesVisited, pagesVisited + usersPerPage)
                  .map(({ email, password, rol, id, timestamp }) => (
                    <div className="col-12 pt-2" key={id}>
                      <div className="card">
                        <div className="card-body">
                          <div className="card-header">
                            <h1 className="text-center">{email}</h1>
                          </div>
                          <p id="blur">{password}</p>
                          <p>{rol}</p>
                          <div className="row">
                            <div className="col-6">
                              <button
                                type="button"
                                className="btn btn-delete"
                                onClick={() => deleteUser(id)}
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
                              <EditCmsUsers
                                email={email}
                                password={password}
                                rol={rol}
                                id={id}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="card-footer">
                          <small>
                            Fecha de creación:
                            <br />
                            {new Date(
                              timestamp.seconds * 1000
                            ).toLocaleString()}
                          </small>
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
                        <th>Email</th>
                        <th>Contraseña</th>
                        <th>Rol</th>
                        <th>Fecha de Creacion</th>
                        <th>Accion 1</th>
                        <th>Accion 2</th>
                      </tr>
                    </thead>
                    <tbody className="table-group-divider">
                      {users
                        .slice(pagesVisited, pagesVisited + usersPerPage)
                        .map(({ email, password, rol, id, timestamp }) => (
                          <tr key={id}>
                            <td>{email}</td>
                            <td id="blur">{password}</td>
                            <td>{rol}</td>
                            <td>
                              {new Date(
                                timestamp.seconds * 1000
                              ).toLocaleString()}
                            </td>
                            <td>
                              <EditCmsUsers
                                email={email}
                                password={password}
                                rol={rol}
                                id={id}
                              />
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-delete"
                                onClick={() => deleteUser(id)}
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
                  previousLabel={"<-"}
                  nextLabel={"->"}
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
                Añadir usuarios
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              {error && (
                <div
                  className="alert alert-warning alert-dismissible fade show d-none"
                  role="alert"
                >
                  <strong>{error}</strong>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                  ></button>
                </div>
              )}
              <form onSubmit={handleSubmitRegister}>
                <div className="form-group pt-3">
                  <label htmlFor="" className="form-label label-white">
                    Correo electrónico
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    inputMode="email"
                    name=""
                    id=""
                    placeholder="Correo electrónico"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group pt-3">
                  <label htmlFor="" className="form-label label-white">
                    Contraseña
                  </label>
                  <input
                    className="form-control"
                    type="password"
                    inputMode="text"
                    name=""
                    id=""
                    placeholder="Contraseña"
                    autoComplete="off"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-group pt-3">
                  <label htmlFor="" className="form-label label-white">
                    Rol
                  </label>
                  <select
                    className="form-select"
                    name=""
                    id="rol"
                    onChange={(e) => setRol(e.target.value)}
                  >
                    <option value="">Seleccione su rol</option>
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
                <Button
                  id="submit"
                  name="submit"
                  text="Registrar usuario"
                  className="btn btn-submit mt-4"
                  type="submit"
                  disabled={!email || !password || !rol}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CmsUsers;
