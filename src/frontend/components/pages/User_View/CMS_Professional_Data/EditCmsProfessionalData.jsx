import React, { useState } from "react";
import Swal from "sweetalert2";
import { Button, TextArea } from "../../../Indexes/AtomsIndexes.jsx";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../backend/Firebase/Firebase-config.js";

const EditCmsProfessionalData = ({ url, skills, experience, id }) => {
  const [urls, setFullUrls] = useState([url]);
  const [fullskills, setFullSkills] = useState([skills]);
  const [fullexperience, setFullExperiences] = useState([experience]);
  const regexLinks =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  const regexLetter = /^[a-zA-ZÀ-ÿ\0-9\u00f1\u00d1\s]/;

  const updateUserInfo = async (e) => {
    e.preventDefault();
    try {
      if (!urls || !fullskills || !fullexperience) {
        Swal.fire({
          title: "¡Atención!",
          icon: "info",
          text: "Ningún campo debe estar vacio",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1000,
        });
      } else if (
        !fullskills.match(regexLetter) ||
        !fullexperience.match(regexLetter)
      ) {
        Swal.fire({
          title: "¡Atención!",
          icon: "info",
          text: "El campo de experiencia laboral y habilidades NO acepta caracteres especiales",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1000,
        });
      } else if (!urls.match(regexLinks)) {
        Swal.fire({
          title: "¡Atención!",
          icon: "info",
          text: "El formato de los links es erroneo. Favor de verificarlo.",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1000,
        });
      } else {
        const taskDocument = doc(db, "ProfessionalInformationUser", id);
        await updateDoc(taskDocument, {
          url: urls,
          skills: fullskills,
          experience: fullexperience,
        });
        Swal.fire({
          title: "Éxito",
          icon: "success",
          text: "La información se ha actualizado exitosamente",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 2000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-edit"
        data-bs-toggle="modal"
        data-bs-target={`#id${id}`}
      >
        <box-icon
          name="message-square-edit"
          type="solid"
          color="white"
          size="sm"
        ></box-icon>
      </button>

      <div
        className="modal fade"
        id={`id${id}`}
        tabIndex="-1"
        aria-labelledby="editLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title" id="editLabel">
                Editar información
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group pt-2">
                  <TextArea
                    titleLabel="form-label label-inmersive-blue"
                    label="Links"
                    type="text"
                    inputMode="text"
                    className="form-control"
                    name="urls"
                    id="urls"
                    placeholder="Links"
                    defaultValue={urls}
                    onChange={(e) => setFullUrls(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group pt-2">
                  <TextArea
                    titleLabel="form-label label-inmersive-blue"
                    label="Habilidades"
                    type="text"
                    inputMode="text"
                    className="form-control"
                    name="fullskills"
                    id="fullskills"
                    placeholder="Habilidades"
                    defaultValue={fullskills}
                    onChange={(e) => setFullSkills(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group pt-2">
                  <TextArea
                    titleLabel="form-label label-inmersive-blue"
                    label="Experiencias laborales"
                    type="text"
                    inputMode="tel"
                    className="form-control"
                    name="fullexperience"
                    id="fullexperience"
                    placeholder="Experiencias laborales"
                    defaultValue={fullexperience}
                    onChange={(e) => setFullExperiences(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group pt-2">
                  <Button
                    text="Actualizar"
                    type="button"
                    className="btn btn-submit"
                    onClick={(e) => updateUserInfo(e)}
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

export default EditCmsProfessionalData;
