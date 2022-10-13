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

const CmsEmployments = () => {
  const initialValue = {
    title: "",
    category: "",
    descripcion: "",
    web_url: "",
  };

  const [employments, setEmployments] = useState(initialValue);
  const [listEmployments, setListEmployments] = useState([]);
  const [subid, setSubid] = useState("");

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setEmployments({ ...employments, [name]: value });
  };

  const saveEmployments = async (e) => {
    e.preventDefault();

    if (subid === "") {
      try {
        await addDoc(collection(db, "trabajos"), {
          ...employments,
        });
      } catch (error) {
        console.log(error);
      }
      Swal.fire({
        title: "Éxito",
        icon: "success",
        text: "La bolsa de empleo se he registrado exitosamente",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      await setDoc(doc(db, "trabajos", subid), {
        ...employments,
      });
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "La bolsa de empleo NO se he podido registrar",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 2000,
      });
    }
    setEmployments({ ...initialValue });
    setSubid("");
  };

  useEffect(() => {
    const getEmployments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "trabajos"));
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setListEmployments(docs);
      } catch (error) {
        console.log(error);
      }
    };
    getEmployments();
  }, [listEmployments]);

  const deleteEmployments = async (id) => {
    await deleteDoc(doc(db, "trabajos", id));
    Swal.fire({
      title: "Éxito",
      icon: "success",
      text: "La bolsa de trabajo se he borrado exitosamente",
      showCancelButton: false,
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const getOne = async (id) => {
    try {
      const docRef = doc(db, "trabajos", id);
      const docSnap = await getDoc(docRef);
      setEmployments(docSnap.data());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (subid !== "") {
      getOne(subid);
    }
  }, [subid]);

  const validateForm = (title, category, description, web_url) => {
    if (!title || !category || !description || !web_url) {
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
          <div className="col-sm-12 col-md-6 employments-left center">
            <h1>Manejador de empleos</h1>
            <Link to="/Home">
              <Button
                id="button"
                text="Volver al inicio"
                className="btn btn-open"
                type="button"
              />
            </Link>
          </div>

          <div className="col-sm-12 col-md-6 employments-right"></div>

          <div className="col-sm-12 col-md-12 employments-bottom pt-5">
            <Tabs>
              <div label="Registrar trabajos">
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
                <form onSubmit={saveEmployments}>
                  <div className="form-group pt-3">
                    <Input
                      titleLabel="form-label label-inmersive-blue"
                      label="Titulo"
                      placeholder="Titulo"
                      type="text"
                      className="form-control"
                      name="title"
                      id="title"
                      value={employments.title}
                      onChange={handleInputs}
                      onBlur={validateForm}
                      required
                    />
                  </div>
                  <div className="form-group pt-3">
                    <Input
                      titleLabel="form-label label-inmersive-blue"
                      label="Categoria"
                      placeholder="Categoria"
                      type="text"
                      className="form-control"
                      name="category"
                      id="category"
                      value={employments.category}
                      onChange={handleInputs}
                      onBlur={validateForm}
                      required
                    />
                  </div>
                  <div className="form-group pt-3">
                    <Input
                      titleLabel="form-label label-inmersive-blue"
                      label="Descripcion"
                      placeholder="Descripcion"
                      type="text"
                      className="form-control"
                      name="descripcion"
                      id="descripcion"
                      value={employments.descripcion}
                      onChange={handleInputs}
                      onBlur={validateForm}
                      required
                    />
                  </div>
                  <div className="form-group pt-3">
                    <Input
                      titleLabel="form-label label-inmersive-blue"
                      label="Sitio web"
                      placeholder="Sitio web"
                      type="text"
                      className="form-control"
                      name="web_url"
                      id="web_url"
                      value={employments.web_url}
                      onChange={handleInputs}
                      onBlur={validateForm}
                      required
                    />
                  </div>
                  <div className="form-group pt-3">
                    <button className="btn btn-submit">
                      {subid === "" ? "Registrar" : "Actualizar"}
                    </button>
                  </div>
                </form>
              </div>
              <div label="Tabla de trabajos">
                <div className="table-responsive-xxl">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Titulo</th>
                        <th scope="col">Categoria</th>
                        <th scope="col">Descripcion</th>
                        <th scope="col">Sitio web</th>
                        <th scope="col">Accion 1</th>
                        <th scope="col">Accion 2</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listEmployments.map((list) => (
                        <tr>
                          <th scope="row" key={list.id}></th>
                          <td>{list.title}</td>
                          <td>{list.category}</td>
                          <td>{list.descripcion}</td>
                          <td>{list.web_url}</td>
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
                              onClick={() => deleteEmployments(list.id)}
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

export default CmsEmployments;
