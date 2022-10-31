import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import { Button, Input, TextArea } from "../../../Indexes/AtomsIndexes";
import * as Regex from "../../../../assets/javascript/regexs/regexs";
import {
  collection,
  getDocs,
  addDoc,
  //deleteDoc,
  //doc,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../../../../backend/Firebase/Firebase-config";

const Resume = () => {
  const [tasks, setTasks] = useState([]);
  const [createName, setCreateName] = useState("");
  const [createAddress, setCreateLink] = useState("");
  const [createMobile, setCreateDescription] = useState("");
  const [createEmail, setCreateUbication] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 1;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(tasks.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const collectionRef = collection(db, "platforms");

  //Add Task Handler
  const submitTask = async (e) => {
    e.preventDefault();
    try {
      if (
        !createName ||
        !createAddress ||
        !createMobile ||
        !createEmail
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
        !createName.match(Regex.Letters) ||
        !createMobile.match(Regex.Letters)
      ) {
        Swal.fire({
          title: "¡Atención!",
          icon: "info",
          text: "El campo nombre y des",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 2000,
        });
      } else if (!createAddress.match(Regex.Links)) {
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
          task: createName,
          platform: createAddress,
          description: createMobile,
          ubication: createEmail,
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
        text: `La bolsa de empleo NO se ha podido registrar. \n Favor de mencionar el siguiente error: ${err} al equipo de TI.`,
        showCancelButton: false,
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(err);
    }
  };

  // eslint-disable-next-line
  {/*const deleteTask = async (id) => {
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
        text: `La bolsa de empleo no se ha podido eliminar.\n Favor de mencionar el siguiente error: ${err} al equipo de TI.`,
        showCancelButton: false,
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(err);
    }
  };*/}

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
          <div className="col-12 resume-left center">
            <h1>Creador de C.V</h1>
            <Link to="">
              <Button
                type="button"
                text="Regresar al inicio"
                className="btn btn-open"
              />
            </Link>
          </div>
          <div className="col-12 resume-right"></div>
          <div className="col-12 resume-bottom">
            <div className="row">
              <div className="col-12 pt-4">
                <button
                  type="button"
                  text="Registrar informacion"
                  className="btn btn-open"
                  data-bs-toggle="modal"
                  data-bs-target="#addModal"
                >
                  Registrar información
                </button>
              </div>

              <div className="col-12 d-sm-block d-md-none pt-2">
                {tasks.length === 0 ? (
                  <div className="alert alert-warning text-center" role="alert">
                    <h4>
                      <strong>¡No hay CV´s registrados!.</strong>
                    </h4>
                    <p>
                      <strong>
                        Registre su C.V.
                      </strong>
                    </p>
                  </div>
                ) : (
                  tasks
                    .slice(pagesVisited, pagesVisited + usersPerPage)
                    .map(
                      ({
                        task,
                        platform,
                        description,
                        ubication,
                        id,
                        timestamp,
                      }) => (
                        <div className="col-12" key={id}>
                          <div className="card">
                            <div className="card-body">
                              <div className="card-header">
                                <h1 className="text-center">{task}</h1>
                              </div>
                              <h3>Descripción:</h3>
                              <p>{description}</p>
                              <h3>Link:</h3>
                              <a
                                rel="nofollow noopener noreferrer"
                                href={platform}
                              >
                                <span className="badge badge-link">
                                  {platform}
                                </span>
                              </a>
                              <h3>Ubicacion</h3>
                              <p>{ubication}</p>
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
                      )
                    )
                )}
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
        <div className="modal-dialog modal-fullscreen">
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
                    onChange={(e) => setCreateName(e.target.value)}
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
                    placeholder="Maximo 250 caracteres"
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
                <div className="form-group">
                  <label htmlFor="ubication">Ubicación</label>
                  <select
                    name="ubication"
                    id="ubication"
                    className="form-select"
                    onChange={(e) => setCreateUbication(e.target.value)}
                  >
                    <option value="">Seleccione una ubicación</option>
                    <option value="Online">Online</option>
                    <option value="Aguascalientes">Aguascalientes</option>
                    <option value="BajaCalifornia">Baja California</option>
                    <option value="BajaCaliforniaSur">
                      Baja California Sur
                    </option>
                    <option value="Campeche">Campeche</option>
                    <option value="Chiapas">Chiapas</option>
                    <option value="Chihuahua">Chihuahua</option>
                    <option value="Coahuila">Coahuila</option>
                    <option value="Colima">Colima</option>
                    <option value="CDMX">Ciudad de Mexico</option>
                    <option value="Durango">Durango</option>
                    <option value="EstadoDeMexico">Estado de Mexico</option>
                    <option value="Guanajuato">Guanajuato</option>
                    <option value="Guerrero">Guerrero</option>
                    <option value="Hidalgo">Hidalgo</option>
                    <option value="Jalisco">Jalisco</option>
                    <option value="Michoacan">Michoacan</option>
                    <option value="Morelos">Morelos</option>
                    <option value="Nayarit">Nayarit</option>
                    <option value="NuevoLeon">Nuevo Leon</option>
                    <option value="Oaxaca">Oaxaca</option>
                    <option value="Puebla">Puebla</option>
                    <option value="Queretaro">Queretaro</option>
                    <option value="QuintanaRoo">Quintana Roo</option>
                    <option value="SanLuisPotosi">San Luis Potosi</option>
                    <option value="Sinaloa">Sinaloa</option>
                    <option value="Sonora">Sonora</option>
                    <option value="Tabasco">Tabasco</option>
                    <option value="Tamaulipas">Tamaulipas</option>
                    <option value="Tlaxcala">Tlaxcala</option>
                    <option value="Veracruz">Veracruz</option>
                    <option value="Yucatan">Yucatan</option>
                    <option value="Zacatecas">Zacatecas</option>
                  </select>
                </div>
                <div className="form-group pt-2">
                  <Button
                    type="submit"
                    className="btn btn-submit"
                    text="Agregar bolsa de empleo"
                    disabled={
                      !createName ||
                      !createMobile ||
                      !createAddress ||
                      !createEmail
                    }
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Resume;
