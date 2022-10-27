import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import { Button, Input } from "../../../Indexes/AtomsIndexes";
import EditProfileUser from "./EditProfileUser";
import * as Routing from "../../../../assets/javascript/constants/routing/routing";
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

const CmsUserProfile = () => {
  const [data, setDatas] = useState([]);
  const [createFullName, setCreateFullName] = useState("");
  const [createAddress, setCreateAddress] = useState("");
  const [createHomePhone, setCreateHomePhone] = useState("");
  const [createMobilePhone, setCreateMobilePhone] = useState("");
  const [createEmail, setCreateEmail] = useState("");
  const [createCurp, setCreateCurp] = useState("");

  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 1;
  const pagesVisited = pageNumber * usersPerPage;

  const pageCount = Math.ceil(data.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const collectionRef = collection(db, "PersonalInformationUser");

  const submitPersonalInfo = async (e) => {
    // eslint-disable-nexts-lines
    const regexLetter = /^[a-zA-Z0-9]*$/;
    // eslint-disable-next-line
    const regexEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$/;
    const regexCurp = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/;
    const regexPhones = /^\d{10,20}$/;
    e.preventDefault();
    try {
      if (
        !createFullName ||
        !createAddress ||
        !createHomePhone ||
        !createMobilePhone ||
        !createEmail ||
        !createCurp
      ) {
        Swal.fire({
          title: "¡Atención!",
          icon: "info",
          text: "Ningún campo debe estar vacio",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1000,
        });
      } else if (
        !createFullName.match(regexLetter) ||
        !createAddress.match(regexLetter)
      ) {
        Swal.fire({
          title: "¡Atención!",
          icon: "info",
          text: "Los campos: Nombre, Dirección NO aceptan caracteres especiales como puntos comas, etc. Favor de verificarlo",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 2500,
        });
      } else if (!createEmail.match(regexEmail)) {
        Swal.fire({
          title: "¡Atención!",
          icon: "info",
          text: "El correo electronico tiene un formato invalido. Favor de verificarlo",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 2500,
        });
      } else if (!createCurp.match(regexCurp)) {
        Swal.fire({
          title: "¡Atención!",
          icon: "info",
          text: "El curp tiene un formato invalido. Favor de verificarlo",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 2500,
        });
      } else if (
        !createHomePhone.match(regexPhones) ||
        !createMobilePhone.match(regexPhones)
      ) {
        Swal.fire({
          title: "¡Atención!",
          icon: "info",
          text: "Los números telefónicos únicamente aeptan números/dígitos. Favor de verificarlo",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 2500,
        });
      } else {
        await addDoc(collectionRef, {
          fullname: createFullName,
          address: createAddress,
          homephone: createHomePhone,
          mobilephone: createMobilePhone,
          email: createEmail,
          curp: createCurp,
          timestamp: serverTimestamp(),
        });
        Swal.fire({
          title: "Éxito",
          icon: "success",
          text: "La información personal se registró exitosamente",
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
        // eslint-disable-next-line
        text:
          "La informacion personal no se ha podido registrar\n" +
          "Favor de enviar el error:" +
          `${err} al equipo de soporte`,
        showCancelButton: false,
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(err);
    }
  };

  const deletePesonalInfo = async (id) => {
    try {
      const documentRef = doc(db, "PersonalInformationUser", id);
      await deleteDoc(documentRef);
      Swal.fire({
        title: "Éxito",
        icon: "success",
        text: "El usuario y su informacion se eliminaron exitosamente",
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
          "El post no se ha podido eliminar.\n" +
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
        .then((data) => {
          let tasksData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setDatas(tasksData);
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
          <div className="col-sm-12 col-md-6 user-profile-left center">
            <h1>Perfil de usuario</h1>
            <Link to={Routing.Home}>
              <Button
                type="button"
                text="Regresar al inicio"
                className="btn btn-open"
              />
            </Link>
          </div>

          <div className="col-sm-12 col-md-6 user-profile-right"></div>

          <div className="col-sm-12 col-md-12 user-profile-bottom">
            <div className="row">
              <div className="col-md-4 offset-md-4 pt-4">
                <button
                  className="btn btn-open"
                  id="button"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#addModal"
                >
                  Agregar informacion
                </button>
              </div>

              <div className="col-12 pt-2 d-sm-block d-md-none">
                {data
                  .slice(pagesVisited, pagesVisited + usersPerPage)
                  .map(
                    ({
                      fullname,
                      address,
                      homephone,
                      mobilephone,
                      email,
                      curp,
                      id,
                      timestamp,
                    }) => (
                      <div className="col-12 pt-2" key={id}>
                        <div className="card">
                          <div className="card-body">
                            <div className="card-header">
                              <h1 className="text-center">{fullname}</h1>
                            </div>
                            <p>{address}</p>
                            <p>{homephone}</p>
                            <p>{mobilephone}</p>
                            <p>{email}</p>
                            <p>{curp}</p>
                            <div className="row">
                              <div className="col-6">
                                <button
                                  type="button"
                                  className="btn btn-delete"
                                  onClick={() => deletePesonalInfo(id)}
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
                                <EditProfileUser
                                  fullname={fullname}
                                  address={address}
                                  homephone={homephone}
                                  mobilephone={mobilephone}
                                  email={email}
                                  curp={curp}
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
                    )
                  )}
              </div>

              <div className="col-12 pt-2 d-none d-md-block">
                <div className="table-responsive">
                  <table className="table table-hover table-bordered">
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Dirección</th>
                        <th>Tel Fijo</th>
                        <th>Tel Movil</th>
                        <th>Email</th>
                        <th>Curp</th>
                        <th>Fecha de Creacion</th>
                        <th>Accion 1</th>
                        <th>Accion 2</th>
                      </tr>
                    </thead>
                    <tbody className="table-group-divider">
                      {data
                        .slice(pagesVisited, pagesVisited + usersPerPage)
                        .map(
                          ({
                            fullname,
                            address,
                            homephone,
                            mobilephone,
                            email,
                            curp,
                            id,
                            timestamp,
                          }) => (
                            <tr key={id}>
                              <td>{fullname}</td>
                              <td>{address}</td>
                              <td>{homephone}</td>
                              <td>{mobilephone}</td>
                              <td>{email}</td>
                              <td>{curp}</td>
                              <td>
                                {new Date(
                                  timestamp.seconds * 1000
                                ).toLocaleString()}
                              </td>
                              <td>
                                <EditProfileUser
                                  fullname={fullname}
                                  address={address}
                                  homephone={homephone}
                                  mobilephone={mobilephone}
                                  email={email}
                                  curp={curp}
                                  id={id}
                                />
                              </td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btn-delete"
                                  onClick={() => deletePesonalInfo(id)}
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
                Añadir información
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form onSubmit={submitPersonalInfo}>
                <div className="form-group">
                  <Input
                    titleLabel="form-label label-inmersive-blue"
                    label="Nombre completo"
                    type="text"
                    className="form-control"
                    name="fullname"
                    id="fullname"
                    placeholder="Nombre completo"
                    onChange={(e) => setCreateFullName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <Input
                    titleLabel="form-label label-inmersive-blue"
                    label="Direccion"
                    type="text"
                    className="form-control"
                    name="address"
                    id="address"
                    placeholder="Direccion"
                    onChange={(e) => setCreateAddress(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <Input
                    titleLabel="form-label label-inmersive-blue"
                    label="Telefono fijo"
                    type="text"
                    inputmode="tel"
                    className="form-control"
                    name="homephone"
                    id="homephone"
                    placeholder="Telefono fijo"
                    onChange={(e) => setCreateHomePhone(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <Input
                    titleLabel="form-label label-inmersive-blue"
                    label="Telefono movil"
                    type="text"
                    inputmode="tel"
                    className="form-control"
                    name="mobilephone"
                    id="mobilephone"
                    placeholder="Telefono movil"
                    onChange={(e) => setCreateMobilePhone(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <Input
                    titleLabel="form-label label-inmersive-blue"
                    label="Correo electrónico"
                    type="text"
                    inputmode="email"
                    className="form-control"
                    name="email"
                    id="email"
                    placeholder="Correo electrónico"
                    onChange={(e) => setCreateEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <Input
                    titleLabel="form-label label-inmersive-blue"
                    label="Curp"
                    type="text"
                    inputmode="text"
                    className="form-control"
                    name="curp"
                    id="curp"
                    placeholder="Curp"
                    onChange={(e) => setCreateCurp(e.target.value)}
                    required
                  />
                  <small className="text-helper text-black">Debe de ir en mayúsculas</small>
                </div>
                <div className="form-group pt-2">
                  <button className="btn btn-submit" type="submit">
                    Registrar
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

export default CmsUserProfile;
