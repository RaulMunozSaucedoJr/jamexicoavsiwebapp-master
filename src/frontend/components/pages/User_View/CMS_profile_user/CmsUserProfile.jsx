import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Tabs } from "../../../Indexes/OrganismsIndex";
import { Button, Input } from "../../../Indexes/AtomsIndexes";

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

const CmsUserProfile = () => {
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const initialValue = {
    user: "",
    password: "",
    complete_name: "",
    email: "",
    date: "",
    role: "",
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
    } else {
      await setDoc(doc(db, "users", subid), {
        ...post,
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
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12 col-md-6 user-profile-left center">
          <h1>Perfil de usuario</h1>
          <Link to="/Home">
            <Button
              className="btn btn-open"
              text="Volver al inicio"
              type="button"
              id="button"
            />
          </Link>
        </div>
        <div className="col-sm-12 col-md-6 user-profile-right"></div>
        <div className="col-sm-12 col-md-6 user-profile-bottom mb-5 mt-5 pb-2">
          <Tabs>
            <div label="Registrar usuario">
              <form onSubmit={savePosts}>
                <div className="form-group pt-3">
                  <Input
                    titleLabel="form-label label-inmersive-blue"
                    label="Usuario"
                    placeholder="Usuario"
                    type="text"
                    className="form-control"
                    name="user"
                    id="user"
                    value={post.user}
                    onChange={handleInputs}
                    required
                  />
                </div>
                <div className="form-group pt-3">
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
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="form-group pt-3">
                  <Input
                    titleLabel="form-label label-inmersive-blue"
                    label="Nombre completo"
                    placeholder="Nombre completo"
                    type="text"
                    className="form-control"
                    name="complete_name"
                    id="complete_name"
                    value={post.complete_name}
                    onChange={handleInputs}
                    required
                  />
                </div>
                <div className="form-group pt-3">
                  <Input
                    titleLabel="form-label label-inmersive-blue"
                    label="Correo electronico"
                    placeholder="Correo electronico"
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    value={post.email}
                    onChange={handleInputs}
                    required
                  />
                </div>
                <div className="form-group pt-3">
                  <label htmlFor="form-select">Seleccione un rol</label>
                  <select className="form-select" id="form-select">
                    <option value="">Seleccione un rol de usuario</option>
                    <option value="1">Administrador</option>
                    <option value="2">Usuario</option>
                  </select>
                </div>
                <div className="form-group pt-3">
                  <Input
                    titleLabel="form-label label-inmersive-blue"
                    label="Fecha de registro"
                    placeholder=""
                    type="email"
                    className="form-control"
                    name="date"
                    id="date"
                    value={date}
                    onChange={handleInputs}
                    readOnly="readOnly"
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
            <div label="Tabla de usuarios">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Usuario</th>
                      <th scope="col">Contraseña</th>
                      <th scope="col">Nombre</th>
                      <th scope="col">Correo</th>
                      <th scope="col">Fecha</th>
                      <th scope="col">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                    {lista.map((list) => (
                      <tr>
                        <th scope="row" key={list.id}></th>
                        <td>{list.user}</td>
                        <td>{list.password}</td>
                        <td>{list.complete_name}</td>
                        <td>{list.email}</td>
                        <td>{list.date}</td>
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

export default CmsUserProfile;
