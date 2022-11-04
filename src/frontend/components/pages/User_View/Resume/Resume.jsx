import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Button, Input, TextArea } from "../../.../../../Indexes/AtomsIndexes";
import * as Regex from "../../../../assets/javascript/regexs/regexs";
import {
  collection,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";
import { auth, db } from "../../../../../backend/Firebase/Firebase-config";

const Resume = () => {
  const [user] = useState({});
  const [fullname, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [correoelectronico, setCorreoElectronico] = useState("");
  const [jobactivities, setJobActivities] = useState("");
  const [jobplaces, setJobPlaces] = useState("");
  const [lastschoolgrade, setLastSchoolGrade] = useState("");
  const [mobilephone, setMobilePhone] = useState("");
  const [sociallinks, setSocialLinks] = useState("");
  const [usedtools, setUsedTools] = useState("");

  const googleProvider = new GoogleAuthProvider();

  const collectionRef = (collection(db, "users"), where("uid", "==", user.uid));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        !fullname ||
        !address ||
        !correoelectronico ||
        !jobactivities ||
        !jobplaces ||
        !lastschoolgrade ||
        !mobilephone ||
        !sociallinks ||
        !usedtools
      ) {
        Swal.fire({
          title: "¡Atención!",
          icon: "info",
          text: "Ningún campo debe estar vacio",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1800,
        });
      } else if (
        !fullname.match(Regex.Letters) ||
        !address.match(Regex.Letters) ||
        !jobactivities.match(Regex.Letters) ||
        !jobplaces.match(Regex.Letters) ||
        !lastschoolgrade.match(Regex.Letters) ||
        !usedtools.match(Regex.Letters)
      ) {
        Swal.fire({
          title: "¡Atención!",
          icon: "info",
          text: "Ninguno de estos campos:\n Nombre, Direccion, ",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 2500,
        });
      } else if (!correoelectronico.match(Regex.Email)) {
        Swal.fire({
          title: "¡Atención!",
          icon: "info",
          text: "El correo electrónico tiene un formato invalido.",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 2500,
        });
      } else if (!mobilephone.match(Regex.Phones)) {
        Swal.fire({
          title: "¡Atención!",
          icon: "info",
          text: "El campo de número celular únicamente acepta número/digitos",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 2500,
        });
      } else if (!sociallinks.match(Regex.Links)) {
        Swal.fire({
          title: "¡Atención!",
          icon: "info",
          text: "El formato de las redes sociales son incorrectos. Favor de verificarlo.",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 2500,
        });
      } else {
        const res = await signInWithPopup(auth, googleProvider);
        // eslint-disable-next-line
        const user = res.user;
        await updateDoc(collectionRef, {
          fullname: fullname,
          address: address,
          correoelectronico: correoelectronico,
          jobactivities: jobactivities,
          jobplaces: jobplaces,
          lastschoolgrade: lastschoolgrade,
          mobilephone: mobilephone,
          sociallinks: sociallinks,
          usedtools: usedtools,
          lastconnection: serverTimestamp(),
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
    } catch (err) {}
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 col-md-6 resume-left center">
            <h1>Creador de C.V.´s</h1>
            <Link to="">
              <Button
                type="button"
                text="Regresar al inicio"
                className="btn btn-open"
              />
            </Link>
          </div>
          <div className="col-sm-12 col-md-6 resume-right"></div>
          <div className="col-sm-12 col-md-12 resume-bottom pt-5">
            <div
              className="alert alert-info alert-dismissible fade show text-center"
              role="alert"
            >
              <strong>
                Se le recomienda completar la información de su perfil para
                poder hacer uso de la plataforma.
              </strong>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
            <button
              type="button"
              className="btn btn-open"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Completar Perfil
            </button>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen-sm-down modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Crea tu C.V.
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <fieldset className="mb-2">
                  <legend>Información de contacto</legend>
                  <div className="form-group pt-3">
                    <Input
                      titleLabel="form-label label-inmersive-blue"
                      label="Nombre completo"
                      type="text"
                      inputMode="text"
                      className="form-control"
                      name="fullname"
                      id="fullname"
                      placeholder="Ejemplo: Rodrigo Miguel Cervantez"
                      required
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <div className="form-group pt-3">
                    <Input
                      titleLabel="form-label label-inmersive-blue"
                      label="Dirección completa"
                      type="text"
                      className="form-control"
                      name="address"
                      id="address"
                      placeholder="Ejemplo: Calle siempre viva #123"
                      required
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="form-group pt-3">
                    <Input
                      titleLabel="form-label label-inmersive-blue"
                      label="Número celular"
                      type="text"
                      inputmode="tel"
                      className="form-control"
                      name="mobilephone"
                      id="mobilephone"
                      placeholder="Ejemplo: 5545222062"
                      required
                      onChange={(e) => setMobilePhone(e.target.value)}
                    />
                  </div>
                  <div className="form-group pt-3">
                    <Input
                      titleLabel="form-label label-inmersive-blue"
                      label="Correo electrónico"
                      type="text"
                      inputMode="email"
                      className="form-control"
                      name="correoelectronico"
                      id="correoelectronico"
                      placeholder="Ejemplo: rodrigomiguel@gmail.com"
                      required
                      onChange={(e) => setCorreoElectronico(e.target.value)}
                    />
                  </div>
                  <div className="form-group pt-3">
                    <TextArea
                      titleLabel="form-label label-inmersive-blue"
                      label="Redes sociales"
                      type="text"
                      inputmode="url"
                      className="form-control"
                      name="sociallinks"
                      id="sociallinks"
                      placeholder="Ejemplo: www.facebook.com/user , www.github.com/user"
                      required
                      onChange={(e) => setSocialLinks(e.target.value)}
                    />
                  </div>
                </fieldset>

                <fieldset className="mb-2">
                  <legend>Información escolar</legend>
                  <div className="form-group pt-3">
                    <TextArea
                      titleLabel="form-label label-inmersive-blue"
                      label="Ultimo grado de estudios"
                      type="text"
                      inputMode="text"
                      className="form-control"
                      name="lastschoolargrade"
                      id="lastschoolargrade"
                      placeholder="Ejemplo: Ingeniero de software en la UACM"
                      required
                      onChange={(e) => setLastSchoolGrade(e.target.value)}
                    />
                  </div>
                </fieldset>

                <fieldset className="mb-2">
                  <legend>Experiencia laboral</legend>
                  <div className="form-group pt-3">
                    <TextArea
                      titleLabel="form-label label-inmersive-blue"
                      label="Lugares en los que ha trabajado"
                      type="text"
                      className="form-control"
                      name="jobplaces"
                      id="jobplaces"
                      placeholder="Ejemplo: Pepsico, Femsa, JaMexico"
                      required
                      onChange={(e) => setJobPlaces(e.target.value)}
                    />
                  </div>
                  <div className="form-group pt-3">
                    <TextArea
                      titleLabel="form-label label-inmersive-blue"
                      label="Actividades desarrolladas"
                      type="text"
                      className="form-control"
                      name="jobactivities"
                      id="jobactivities"
                      placeholder="Ejemplo: Testing, Programación, Levantamiento de requisitos"
                      required
                      onChange={(e) => setJobActivities(e.target.value)}
                    />
                  </div>
                  <div className="form-group pt-3">
                    <TextArea
                      titleLabel="form-label label-inmersive-blue"
                      label="Herramientas utilizadas"
                      type="text"
                      className="form-control"
                      name="usedtools"
                      id="usedtools"
                      placeholder="Ejemplo: Bootstrap, Cypress, React, MySQL, PHP"
                      required
                      onChange={(e) => setUsedTools(e.target.value)}
                    />
                  </div>
                </fieldset>

                <div className="form-group pt-3">
                  <Button
                    type="submit"
                    text="Imprimir C.V."
                    className="btn btn-submit"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
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
