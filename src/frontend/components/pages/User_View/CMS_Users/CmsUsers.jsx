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

const CmsUsers = () => {
  const initialValue = {
    email: "",
    password: "",
    rol: "",
  };

  //Variables de estado
  const [post, setPost] = useState(initialValue);
  const [lista, setList] = useState([]);
  const [subid, setSubid] = useState("");

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };
  //Function to save post and update
  const savePosts = async (e) => {
    e.preventDefault();

    if (subid === "") {
      try {
        await addDoc(collection(db, "users"), {
          ...post,
        });
      } catch (error) {
        console.log(error);
      }
      Swal.fire({
        title: "Éxito",
        icon: "success",
        text: "El usuario se he registrado exitosamente",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      await setDoc(doc(db, "users", subid), {
        ...post,
      });
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "El usuario NO se he podido registrar",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 2000,
      });
    }
    setPost({ ...initialValue });
    setSubid("");
  };

  //Function to render posts list
  useEffect(() => {
    const getList = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
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

  //Function to delete posts
  const deletePost = async (id) => {
    await deleteDoc(doc(db, "users", id));
    Swal.fire({
      title: "Éxito",
      icon: "success",
      text: "El usuario se he borrado exitosamente",
      showCancelButton: false,
      showConfirmButton: false,
      timer: 2000,
    });
  };

  //Function to update posts
  const getOne = async (id) => {
    try {
      const docRef = doc(db, "users", id);
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

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 col-md-6 faqs-left center">
            <h1>Manejador de usuarios</h1>
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
                <div label="Registrar usuarios">
                  <form onSubmit={savePosts}>
                    <div className="form-group">
                      <Input
                        titleLabel="form-label label-inmersive-blue"
                        label="Correo"
                        placeholder="Correo"
                        type="text"
                        className="form-control"
                        name="email"
                        id="email"
                        value={post.email}
                        onChange={handleInputs}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <Input
                        titleLabel="form-label label-inmersive-blue"
                        label="Contraseña"
                        placeholder="Contraseña"
                        type="password"
                        className="form-control"
                        name="password"
                        id="password"
                        value={post.password}
                        onChange={handleInputs}
                        required
                        autoComplete="off"
                      />
                    </div>
                    <div className="form-group">
                      <Input
                        titleLabel="form-label label-inmersive-blue"
                        label="Rol"
                        placeholder="Rol"
                        type="text"
                        className="form-control"
                        name="rol"
                        id="rol"
                        value={post.rol}
                        onChange={handleInputs}
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
                <div label="Tabla de usuarios">
                  <div className="table-responsive-xxl">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Usuario/Correo</th>
                          <th>Contraseña</th>
                          <th>Rol</th>
                          <th>Accion1</th>
                          <th>Accion2</th>
                        </tr>
                      </thead>
                      <tbody>
                        {lista.map((list) => (
                          <tr>
                            <td key={list.id}></td>
                            <td>{list.email}</td>
                            <td>{list.password}</td>
                            <td>{list.rol}</td>
                            <td>
                              <Button
                                id="button"
                                text=""
                                className="btn btn-edit"
                                type="button"
                                onClick={() => setSubid(list.id)}
                              >
                              </Button>
                            </td>
                            <td>
                              <Button
                                id="button"
                                text=""
                                className="btn btn-delete"
                                type="button"
                                onClick={() => deletePost(list.id)}
                              ></Button>
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

export default CmsUsers;
