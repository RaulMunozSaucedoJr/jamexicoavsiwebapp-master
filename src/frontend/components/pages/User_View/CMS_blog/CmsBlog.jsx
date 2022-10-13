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

/* Getting the database. */
const db = getFirestore(app);

const CmsBlog = () => {
  /* A constant that is used to reset the form. */
  const initialValue = {
    title: "",
    category: "",
    content: "",
  };

  /* A hook that allows you to use state in functional components. */
  const [post, setPost] = useState(initialValue);
  const [lista, setList] = useState([]);
  const [subid, setSubid] = useState("");

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const savePosts = async (e) => {
    e.preventDefault();
    if (subid === "") {
      try {
        await addDoc(collection(db, "posts"), {
          ...post,
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
        ...post,
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
    setPost({ ...initialValue });
    setSubid("");
  };

  useEffect(() => {
    const getList = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setList(docs);
      } catch (error) {
        console.log(error);
      }
    };
    getList();
  }, [lista]);

  const deletePost = async (id) => {
    await deleteDoc(doc(db, "posts", id));
    Swal.fire({
      title: "Éxito",
      icon: "success",
      text: "El post se he borrado exitosamente",
      showCancelButton: false,
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const getOne = async (id) => {
    try {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      setPost(docSnap.data());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (subid !== "") {
      getOne(subid);
    }
  }, [subid]);

  const validateForm = (title, category, content) => {
    if (!title || !category || !content) {
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
        <div className="col-sm-12 col-md-6 blog-left center">
          <h1>Manejador de post's</h1>
          <Link to="/Home">
            <Button
              id="button"
              text="Volver al inicio"
              className="btn btn-open"
              type="button"
            />
          </Link>
        </div>
        <div className="col-sm-12 col-md-6 blog-right"></div>
        <div className="col-sm-12 col-md-12 blog-bottom pt-5">
          <Tabs>
            <div label="Registrar posts">
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
              <form onSubmit={savePosts}>
                <div className="form-group pt-3">
                  <Input
                    titleLabel="form-label label-inmersive-blue"
                    label="Titulo"
                    placeholder="Titulo"
                    type="text"
                    className="form-control"
                    name="title"
                    id="title"
                    value={post.title}
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
                    value={post.category}
                    onChange={handleInputs}
                    required
                  />
                </div>
                <div className="form-group pt-3">
                  <label
                    htmlFor="content"
                    className="form-label label-inmersive-blue"
                  >
                    Contenido
                  </label>
                  <textarea
                    placeholder="Contenido"
                    type="text"
                    className="form-control"
                    name="content"
                    id="content"
                    value={post.content}
                    onChange={handleInputs}
                    onBlur={validateForm}
                    required
                  />
                </div>
                <div className="form-group pt-3">
                  <button className="btn btn-submit" type="submit">
                    {subid === "" ? "Registrar" : "Actualizar"}
                  </button>
                </div>
              </form>
            </div>
            <div label="Tabla de posts">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Titulo</th>
                      <th>Categoria</th>
                      <th>Contenido</th>
                      <th>Accion 1</th>
                      <th>Accion 2</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lista.map((list) => (
                      <tr>
                        <th scope="row" key={list.id}></th>
                        <td>{list.title}</td>
                        <td>{list.category}</td>
                        <td>{list.content}</td>
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
                            onClick={() => deletePost(list.id)}
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

export default CmsBlog;
