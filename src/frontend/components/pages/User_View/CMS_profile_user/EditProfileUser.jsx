import React, { useState } from "react";
import Swal from "sweetalert2";
import { Input, Button } from "../../../Indexes/AtomsIndexes.jsx";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../backend/Firebase/Firebase-config.js";

const EditProfileUser = ({
  fullname,
  address,
  homephone,
  mobilephone,
  email,
  curp,
  id,
}) => {
  const [fullnames, setFullNames] = useState([fullname]);
  const [fulladdress, setFullAddress] = useState([address]);
  const [fullhomephones, setFullHomePhones] = useState([homephone]);
  const [fullmobilephones, setFullMobilePhones] = useState([mobilephone]);
  const [fullemails, setFullEmail] = useState([email]);
  const [fullcurps, setFullCurps] = useState([curp]);

  const updateUserInfo = async (e) => {
    // eslint-disable-nexts-lines
    const regexLetter = /^[a-zA-Z0-9]*$/;
    // eslint-disable-next-line
    const regexEmail =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$/;
    const regexCurp =
      /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/;
    const regexPhones = /^\d{10,20}$/;

    e.preventDefault();
    try {
      if (
        !fullnames ||
        !fulladdress ||
        !fullhomephones ||
        !fullmobilephones ||
        !fullemails ||
        !fullcurps
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
        !fullnames.match(regexLetter) ||
        !fulladdress.match(regexLetter)
      ) {
        Swal.fire({
          title: "¡Atención!",
          icon: "info",
          text: "Ningún campo acepta carácteres especiales y/o números",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1000,
        });
      } else if (
        !fullhomephones.match(regexPhones) ||
        !fullmobilephones.match(regexPhones)
      ) {
        Swal.fire({
          title: "¡Atención!",
          icon: "info",
          text: "Los números telefónicos únicamente aeptan números/dígitos. Favor de verificarlo",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 2500,
        });
      } else if (!fullemails.match(regexEmail)) {
        Swal.fire({
          title: "¡Atención!",
          icon: "info",
          text: "El correo electronico tiene un formato invalido. Favor de verificarlo",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 2500,
        });
      } else if (!fullcurps.match(regexCurp)) {
        Swal.fire({
          title: "¡Atención!",
          icon: "info",
          text: "El curp tiene un formato invalido. Favor de verificarlo",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 2500,
        });
      } else {
        const taskDocument = doc(db, "PersonalInformationUser", id);
        await updateDoc(taskDocument, {
          fullname: fullnames,
          address: fulladdress,
          homephone: fullhomephones,
          mobilephone: fullmobilephones,
          email: fullemails,
          curp: fullcurps,
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
                  <Input
                    titleLabel="form-label label-inmersive-blue"
                    label="Nombre completo"
                    type="text"
                    inputMode="text"
                    className="form-control"
                    name="fullnames"
                    id="fullnames"
                    placeholder="Nombre completo"
                    defaultValue={fullnames}
                    onChange={(e) => setFullNames(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group pt-2">
                  <Input
                    titleLabel="form-label label-inmersive-blue"
                    label="Direccion"
                    type="text"
                    inputMode="text"
                    className="form-control"
                    name="fulladdress"
                    id="fulladdress"
                    placeholder="Direccion"
                    defaultValue={fulladdress}
                    onChange={(e) => setFullAddress(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group pt-2">
                  <Input
                    titleLabel="form-label label-inmersive-blue"
                    label="Telefono fijo"
                    type="text"
                    inputMode="tel"
                    className="form-control"
                    name="fullhomephones"
                    id="fullhomephones"
                    placeholder="Telefono fijo"
                    defaultValue={fullhomephones}
                    onChange={(e) => setFullHomePhones(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group pt-2">
                  <Input
                    titleLabel="form-label label-inmersive-blue"
                    label="Telefono movil"
                    type="text"
                    inputMode="tel"
                    className="form-control"
                    name="fullmobilephones"
                    id="fullmobilephones"
                    placeholder="Telefono movil"
                    defaultValue={fullmobilephones}
                    onChange={(e) => setFullMobilePhones(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group pt-2">
                  <Input
                    titleLabel="form-label label-inmersive-blue"
                    label="Email"
                    type="text"
                    inputMode="email"
                    className="form-control"
                    name="fullemail"
                    id="fullemail"
                    placeholder="Email"
                    defaultValue={fullemails}
                    onChange={(e) => setFullEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group pt-2">
                  <Input
                    titleLabel="form-label label-inmersive-blue"
                    label="Curp"
                    type="text"
                    inputMode="text"
                    className="form-control"
                    name="fullcurp"
                    id="fullcurp"
                    placeholder="Curp"
                    defaultValue={fullcurps}
                    onChange={(e) => setFullCurps(e.target.value)}
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

export default EditProfileUser;
