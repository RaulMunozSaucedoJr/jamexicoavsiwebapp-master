import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Button, Input } from "../../../Indexes/AtomsIndexes";
import { Tabs } from "../../../Indexes/OrganismsIndex";
import app from "../../../../../backend/Firebase/Firebase-config.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  getDoc,
  setDoc,
} from "firebase/firestore";

const db = getFirestore(app);

const CmsResume = () => {
  /* A constant that is used to reset the form. */
  const initialValue = {
    professional_description: "",
    address: "",
    mobile_tel: "",
    email: "",
    linkedin_url: "",
    web_url: "",
    skills: "",
    actual_job: "",
    past_jobs: "",
    links_jobs: "",
    descriptions_jobs: "",
  };

  const [resume, setResume] = useState(initialValue);
  const [listFaqs, setListResume] = useState([]);
  const [subid, setSubid] = useState("");

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setResume({ ...resume, [name]: value });
  };

  const saveResumes = async (e) => {
    e.preventDefault();

    if (subid === "") {
      try {
        await addDoc(collection(db, "resumes"), {
          ...resume,
        });
      } catch (error) {
        console.log(error);
      }
      Swal.fire({
        title: "Éxito",
        icon: "success",
        text: "La información del CV se he registrado exitosamente",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      await setDoc(doc(db, "resumes", subid), {
        ...resume,
      });
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "La información del CV NO se he podido registrar",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 2000,
      });
    }
    setResume({ ...initialValue });
    setSubid("");
  };

  useEffect(() => {
    const getList = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "resumes"));
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setListResume(docs);
      } catch (error) {
        console.log(error);
      }
    };
    getList();
  }, [listFaqs]);

  const deleteResume = async (id) => {
    await deleteDoc(doc(db, "resumes", id));
    Swal.fire({
      title: "Éxito",
      icon: "success",
      text: "La información del CV se he borrado exitosamente",
      showCancelButton: false,
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const getOne = async (id) => {
    try {
      const docRef = doc(db, "resumes", id);
      const docSnap = await getDoc(docRef);
      setResume(docSnap.data());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (subid !== "") {
      getOne(subid);
    }
  }, [subid]);

  const validateForm = (fullname, email, skills) => {
    if (!fullname || !email || !skills) {
      Swal.fire({
        icon: "info",
        title: "¡Atencion!",
        text: "Ningun campo debe estar vacio. Favor de verificalros.",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 col-md-6 create-resume-left center">
            <h1>Creador de C.V.</h1>
            <Link to="/Home">
              <Button
                type="button"
                className="btn btn-submit"
                text="Regresar al inicio"
                id="button"
              />
            </Link>
          </div>
          <div className="col-sm-12 col-md-6 create-resume-right"></div>
          <div className="col-sm-12 col-md-12 create-resume-bottom pt-2">
            <Tabs>
              <div label="Crear CV">
                <div
                  className="alert alert-success alert-dismissible fade show"
                  role="alert"
                >
                  ¡Hola!. Se le recuerda que todos los campos son{" "}
                  <strong>OBLIGATORIOS</strong>.
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                  ></button>
                </div>
                <form onSubmit={saveResumes}>
                  <div className="row">
                    <div className="col-12">
                      <h1>Informacion personal & Skills</h1>
                    </div>
                    <div className="col-sm-12 col-md-4 pt-2">
                      <Input
                        titleLabel="form-label label-inmersive-blue"
                        label="Nombre completo"
                        placeholder="Nombre completo"
                        type="text"
                        inputMode="text"
                        className="form-control"
                        name="fullname"
                        id="fullname"
                        value={resume.fullname}
                        onChange={handleInputs}
                        onBlur={validateForm}
                        required
                      />
                    </div>
                    <div className="col-sm-12 col-md-12 pt-2">
                      <label htmlFor="profesional-profile">
                        Descripción profesional
                      </label>
                      <textarea
                        className="form-control"
                        placeholder="Perfil profesional"
                        id="professional_description"
                        name="professional_description"
                        value={resume.professional_description}
                        onChange={handleInputs}
                      />
                    </div>
                    <div className="col-sm-12 col-md-4 pt-2">
                      <Input
                        titleLabel="form-label label-inmersive-blue"
                        label="Direccion"
                        placeholder="Direccion"
                        type="text"
                        inputMode="text"
                        className="form-control"
                        name="address"
                        id="address"
                        value={resume.address}
                        onChange={handleInputs}
                        required
                      />
                    </div>
                    <div className="col-sm-12 col-md-4 pt-2">
                      <Input
                        titleLabel="form-label label-inmersive-blue"
                        label="Telefono Movil"
                        placeholder="Telefono Movil"
                        type="text"
                        inputMode="tel"
                        className="form-control"
                        name="mobile_tel"
                        id="mobile_tel"
                        value={resume.mobile_tel}
                        onChange={handleInputs}
                        required
                      />
                    </div>
                    <div className="col-sm-12 col-md-4 pt-2">
                      <Input
                        titleLabel="form-label label-inmersive-blue"
                        label="Email"
                        placeholder="correo@live.com.mx"
                        type="text"
                        inputMode="email"
                        className="form-control"
                        name="email"
                        id="email"
                        value={resume.email}
                        onChange={handleInputs}
                        onBlur={validateForm}
                        required
                      />
                    </div>
                    <div className="col-sm-12 col-md-4 pt-2">
                      <Input
                        titleLabel="form-label label-inmersive-blue"
                        label="Perfil Linkedin"
                        placeholder="www.linkedin.com/in/usuario"
                        type="text"
                        inputMode="url"
                        className="form-control"
                        name="linkedin_url"
                        id="linkedin_url"
                        value={resume.linkedin_url}
                        onChange={handleInputs}
                        required
                      />
                    </div>
                    <div className="col-sm-12 col-md-4 pt-2">
                      <Input
                        titleLabel="form-label label-inmersive-blue"
                        label="Sitio web"
                        placeholder="www.sitioweb.com"
                        type="text"
                        inputMode="url"
                        className="form-control"
                        name="web_url"
                        id="web_url"
                        value={resume.web_url}
                        onChange={handleInputs}
                        required
                      />
                    </div>
                    <div className="col-sm-12 col-md-4 pt-2">
                      <label htmlFor="skills">Habilidades</label>
                      <textarea
                        className="form-control"
                        value={resume.skills}
                        onChange={handleInputs}
                        onBlur={validateForm}
                        name="skills"
                        id="skills"
                        placeholder="Habilidades"
                      />
                    </div>
                    <div className="col-12">
                      <hr />
                    </div>
                    <div className="col-12">
                      <h1>Experiencia(s) laboral(es)</h1>
                    </div>
                    <div className="col-sm-12 col-md-12 pt-2">
                      <Input
                        titleLabel="form-label label-inmersive-blue"
                        label="Empleo actual"
                        placeholder="Empleo actual"
                        type="text"
                        inputMode="text"
                        className="form-control"
                        name="actual_job"
                        id="actual_job"
                        value={resume.actual_job}
                        onChange={handleInputs}
                        required
                      />
                    </div>
                    <div className="col-sm-12 col-md-6 pt-2">
                      <label htmlFor="past_jobs">Empleos anteriores</label>
                      <textarea
                        className="form-control"
                        value={resume.past_jobs}
                        onChange={handleInputs}
                        name="past_jobs"
                        id="past_jobs"
                        placeholder="Empleos pasados"
                      />
                    </div>
                    <div className="col-sm-12 col-md-6 pt-2">
                      <label htmlFor="links_jobs">Links empleos</label>
                      <textarea
                        className="form-control"
                        value={resume.links_jobs}
                        onChange={handleInputs}
                        name="links_jobs"
                        id="links_jobs"
                        placeholder="Link empleos"
                      />
                    </div>
                    <div className="col-sm-12 col-md-12 pt-2">
                      <label htmlFor="descriptions_jobs">
                        Descripciones empleos
                      </label>
                      <textarea
                        className="form-control"
                        value={resume.descriptions_jobs}
                        onChange={handleInputs}
                        name="descriptions_jobs"
                        id="descriptions_jobs"
                        placeholder="Descripcion"
                      />
                    </div>
                    <div className="col-12 pt-5">
                      <button className="btn btn-submit">
                        {subid === "" ? "Registrar" : "Actualizar"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div label="C.V's">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Descripcion</th>
                        <th>Direccion</th>
                        <th>Movil</th>
                        <th>Email</th>
                        <th>Linkedin</th>
                        <th>Web</th>
                        <th>Habilidades</th>
                        <th>Empleo actual</th>
                        <th>Empleos anteriores</th>
                        <th>Links empleos</th>
                        <th>Descripciones empleos</th>
                        <th>Accion 1</th>
                        <th>Accion 2</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listFaqs.map((list) => (
                        <tr>
                          <th scope="row" key={list.id}></th>
                          <td>{list.professional_description}</td>
                          <td>{list.address}</td>
                          <td>{list.mobile_tel}</td>
                          <td>{list.email}</td>
                          <td>{list.linkedin_url}</td>
                          <td>{list.web_url}</td>
                          <td>{list.skills}</td>
                          <td>{list.actual_job}</td>
                          <td>{list.past_jobs}</td>
                          <td>{list.links_jobs}</td>
                          <td>{list.descriptions_jobs}</td>
                          <td>
                            <Button
                              id="button"
                              text="Editar"
                              className="btn btn-edit"
                              type="button"
                              onClick={() => setSubid(list.id)}
                            />
                          </td>
                          <td>
                            <Button
                              id="button"
                              text="Borrar"
                              className="btn btn-delete"
                              type="button"
                              onClick={() => deleteResume(list.id)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default CmsResume;
