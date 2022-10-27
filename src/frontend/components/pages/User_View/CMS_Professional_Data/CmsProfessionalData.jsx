import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import { Button, TextArea } from "../../../Indexes/AtomsIndexes";
import EditCmsProfessionalData from "./EditCmsProfessionalData";
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

const CmsProfessionalData = () => {
  const regexLinks =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  const regexLetter = /^[a-zA-ZÀ-ÿ\0-9\u00f1\u00d1\s]/;

  const [data, setDatas] = useState([]);
  const [createUrl, setCreateUrl] = useState("");
  const [createSkills, setCreateSkills] = useState("");
  const [createExperience, setCreateExperience] = useState("");

  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 1;
  const pagesVisited = pageNumber * usersPerPage;

  const pageCount = Math.ceil(data.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const collectionRef = collection(db, "ProfessionalInformationUser");

  const submitPersonalInfo = async (e) => {
    e.preventDefault();
    try {
      if (!createUrl || !createSkills || !createExperience) {
        Swal.fire({
          title: "¡Atención!",
          icon: "info",
          text: "Ningún campo debe estar vacio",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1000,
        });
      } else if (
        !createExperience.match(regexLetter) ||
        !createSkills.match(regexLetter)
      ) {
        Swal.fire({
          title: "¡Atención!",
          icon: "info",
          text: "El campo de experiencia laboral y habilidades NO acepta caracteres especiales",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1000,
        });
      } else if (!createUrl.match(regexLinks)) {
        Swal.fire({
          title: "¡Atención!",
          icon: "info",
          text: "El formato de los links es erroneo. Favor de verificarlo.",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1000,
        });
      } else {
        await addDoc(collectionRef, {
          url: createUrl,
          skills: createSkills,
          experience: createExperience,
          timestamp: serverTimestamp(),
        });
        Swal.fire({
          title: "Éxito",
          icon: "success",
          text: "La información profesional se registró exitosamente",
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
          "La informacion profesional no se ha podido registrar\n" +
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
      const documentRef = doc(db, "ProfessionalInformationUser", id);
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
            <h1>Datos profesionales</h1>
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
                  Agregar informacion laboral
                </button>
              </div>

              <div className="col-12 pt-2 d-sm-block d-md-none">
                {data
                  .slice(pagesVisited, pagesVisited + usersPerPage)
                  .map(({ url, skills, experience, id, timestamp }) => (
                    <div className="col-12 pt-2" key={id}>
                      <div className="card">
                        <div className="card-body">
                          <div className="card-header">
                            <h1 className="text-center">Informacion</h1>
                          </div>
                          <h3>Links:</h3>
                          <p>{url}</p>
                          <h3>Habilidades:</h3>
                          <p>{skills}</p>
                          <h3>Descripcion de experiencia:</h3>
                          <p>{experience}</p>
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
                              <EditCmsProfessionalData
                                url={url}
                                skills={skills}
                                experience={experience}
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
                        <th>Urls</th>
                        <th>Habilidades</th>
                        <th>Experiencia</th>
                        <th>Fecha de Creacion</th>
                        <th>Accion 1</th>
                        <th>Accion 2</th>
                      </tr>
                    </thead>
                    <tbody className="table-group-divider">
                      {data
                        .slice(pagesVisited, pagesVisited + usersPerPage)
                        .map(({ url, skills, experience, id, timestamp }) => (
                          <tr key={id}>
                            <td>{url}</td>
                            <td>{skills}</td>
                            <td>{experience}</td>
                            <td>
                              {new Date(
                                timestamp.seconds * 1000
                              ).toLocaleString()}
                            </td>
                            <td>
                              <EditCmsProfessionalData
                                url={url}
                                skills={skills}
                                experience={experience}
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
                Añadir información laboral
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
                  <TextArea
                    titleLabel="form-label label-inmersive-blue"
                    label="Links de redes sociales, sitio web"
                    type="text"
                    className="form-control"
                    name="url"
                    id="url"
                    placeholder="Links de redes sociales, sitio web"
                    onChange={(e) => setCreateUrl(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <TextArea
                    titleLabel="form-label label-inmersive-blue"
                    label="Habilidades"
                    type="text"
                    className="form-control"
                    name="skills"
                    id="skills"
                    placeholder="Habilidades"
                    onChange={(e) => setCreateSkills(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <TextArea
                    titleLabel="form-label label-inmersive-blue"
                    label="Experiencia"
                    type="text"
                    inputmode="text"
                    className="form-control"
                    name="experience"
                    id="experience"
                    placeholder="Experiencia"
                    onChange={(e) => setCreateExperience(e.target.value)}
                    required
                  />
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

export default CmsProfessionalData;
