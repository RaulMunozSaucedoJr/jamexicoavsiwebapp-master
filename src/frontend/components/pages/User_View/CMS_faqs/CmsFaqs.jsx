import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Input, Button } from "../../../Indexes/AtomsIndexes";
import { Tabs } from "../../../Indexes/OrganismsIndex";
import Delete from "../../../../assets/images/png/delete.png";
import Edit from "../../../../assets/images/png/edit.png";
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

const CmsFaqs = () => {
  const initialValue = {
    pregunta: "",
    respuesta: "",
  };

  const [faqs, setFaqs] = useState(initialValue);
  const [listFaqs, setListFaqs] = useState([]);
  const [subid, setSubid] = useState("");

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setFaqs({ ...faqs, [name]: value });
  };

  const saveFaqs = async (e) => {
    e.preventDefault();

    if (subid === "") {
      try {
        await addDoc(collection(db, "faqs"), {
          ...faqs,
        });
      } catch (error) {
        console.log(error);
      }
      Swal.fire({
        title: "Éxito",
        icon: "success",
        text: "La pregunta/respuesta se he registrado exitosamente",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      await setDoc(doc(db, "faqs", subid), {
        ...faqs,
      });
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "La pregunta/respuesta NO se he podido registrar",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 2000,
      });
    }
    setFaqs({ ...initialValue });
    setSubid("");
  };

  useEffect(() => {
    const getList = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "faqs"));
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setListFaqs(docs);
      } catch (error) {
        console.log(error);
      }
    };
    getList();
  }, [listFaqs]);

  const deletePost = async (id) => {
    await deleteDoc(doc(db, "faqs", id));
    Swal.fire({
      title: "Éxito",
      icon: "success",
      text: "La pregunta/respuesta se he borrado exitosamente",
      showCancelButton: false,
      showConfirmButton: false,
      timer: 2000,
    });
  };

  //Function to update posts
  const getOne = async (id) => {
    try {
      const docRef = doc(db, "faqs", id);
      const docSnap = await getDoc(docRef);
      setFaqs(docSnap.data());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (subid !== "") {
      getOne(subid);
    }
  }, [subid]);

  const validateForm = (question, response) => {
    if (!question || !response) {
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
          <div className="col-sm-12 col-md-6 faqs-left center">
            <h1>Manejador de FAQs</h1>
            <Link to="/Home">
              <Button
                id="button"
                text="Volver al inicio"
                className="btn btn-open"
                type="button"
              />
            </Link>
          </div>
          <div className="col-sm-12 col-md-6 faqs-right"></div>
          <div className="col-sm-12 col-md-12 faqs-bottom">
            <div>
              <Tabs>
                <div label="Registrar Preguntas">
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
                  <form onSubmit={saveFaqs}>
                    <div className="form-group">
                      <Input
                        titleLabel="form-label label-inmersive-blue"
                        label="Pregunta"
                        placeholder="Pregunta"
                        type="text"
                        className="form-control"
                        name="question"
                        id="question"
                        value={faqs.question}
                        onChange={handleInputs}
                        onBlur={validateForm}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <Input
                        titleLabel="form-label label-inmersive-blue"
                        label="Respuesta"
                        placeholder="Respuesta"
                        type="text"
                        className="form-control"
                        name="response"
                        id="response"
                        value={faqs.response}
                        onChange={handleInputs}
                        onBlur={validateForm}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <button className="btn btn-submit mt-4">
                        {subid === "" ? "Registrar" : "Actualizar"}
                      </button>
                    </div>
                  </form>
                </div>
                <div label="Tabla de Preguntas">
                  <div className="table-responsive-xxl">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Pregunta</th>
                          <th>Respuesta</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {listFaqs.map((list) => (
                          <tr>
                            <td key={list.id}></td>
                            <td>{list.pregunta}</td>
                            <td>{list.respuesta}</td>
                            <td>
                              <Button
                                id="button"
                                text=""
                                className="btn btn-edit"
                                type="button"
                                onClick={() => setSubid(list.id)}
                              >
                                <img
                                  src={Edit}
                                  className="img-fluid"
                                  alt="Icono"
                                />
                              </Button>
                              <Button
                                id="button"
                                text=""
                                className="btn btn-delete"
                                type="button"
                                onClick={() => deletePost(list.id)}
                              >
                                <img
                                  src={Delete}
                                  class="img-fluid"
                                  alt="Icono"
                                />
                              </Button>
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
      </div>
    </>
  );
};

export default CmsFaqs;
