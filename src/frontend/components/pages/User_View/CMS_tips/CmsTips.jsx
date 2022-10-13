import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Input, Button } from "../../../Indexes/AtomsIndexes";
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

const CmsTips = () => {
  const initialValue = {
    title: "",
    category: "",
    descripcion: "",
  };

  //Variables de estado
  const [faqs, setTips] = useState(initialValue);
  const [listTips, setListTips] = useState([]);
  const [subid, setSubid] = useState("");

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setTips({ ...faqs, [name]: value });
  };
  //Function to save faqs and update
  const saveTipss = async (e) => {
    e.preventDefault();

    if (subid === "") {
      try {
        await addDoc(collection(db, "tips"), {
          ...faqs,
        });
      } catch (error) {
        console.log(error);
      }
      Swal.fire({
        title: "Éxito",
        icon: "success",
        text: "El tip se he registrado exitosamente",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      await setDoc(doc(db, "tips", subid), {
        ...faqs,
      });
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "El tip NO se he podido registrar. Verifique la información registrada",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 2000,
      });
    }
    setTips({ ...initialValue });
    setSubid("");
  };

  //Function to render faqss list
  useEffect(() => {
    const getList = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tips"));
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setListTips(docs);
      } catch (error) {
        console.log(error);
      }
    };
    getList();
  }, [listTips]);

  //Function to delete posts
  const deleteTips = async (id) => {
    await deleteDoc(doc(db, "tips", id));
    Swal.fire({
      title: "Éxito",
      icon: "success",
      text: "El tip se he borrado exitosamente",
      showCancelButton: false,
      showConfirmButton: false,
      timer: 2000,
    });
  };

  //Function to update posts
  const getOne = async (id) => {
    try {
      const docRef = doc(db, "tips", id);
      const docSnap = await getDoc(docRef);
      setTips(docSnap.data());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (subid !== "") {
      getOne(subid);
    }
  }, [subid]);

  const validateForm = (title, description, category) => {
    if (!title || !description || !category) {
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
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12 col-md-6 tips-left center">
          <h1>Manejador de tips laborales</h1>
          <Link to="/Home">
            <Button
              id="button"
              text="Volver al inicio"
              className="btn btn-open"
              type="button"
            />
          </Link>
        </div>
        <div className="col-sm-12 col-md-6 tips-right"></div>
        <div className="col-sm-12 col-md-12 tips-bottom pt-5">
          <Tabs>
            <div label="Registrar tips">
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
              <form onSubmit={saveTipss}>
                <div className="form-group pt-3">
                  <Input
                    titleLabel="form-label label-inmersive-blue"
                    label="Titulo"
                    placeholder="Titulo"
                    type="text"
                    className="form-control"
                    name="title"
                    id="title"
                    value={faqs.title}
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
                    value={faqs.category}
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
                    value={faqs.descripcion}
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
            <div label="Tabla de tips">
              <div className="table-responsive-xxl">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Titulo</th>
                      <th>Categoria</th>
                      <th>Descripcion</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listTips.map((list) => (
                      <tr>
                        <th scope="row" key={list.id}></th>
                        <td>{list.title}</td>
                        <td>{list.category}</td>
                        <td>{list.descripcion}</td>
                        <td>
                          <Button
                            id="button"
                            text="Editar"
                            className="btn btn-edit"
                            type="button"
                            onClick={() => setSubid(list.id)}
                          />
                          <Button
                            id="button"
                            text="Borrar"
                            className="btn btn-delete"
                            type="button"
                            onClick={() => deleteTips(list.id)}
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
  );
};

export default CmsTips;
