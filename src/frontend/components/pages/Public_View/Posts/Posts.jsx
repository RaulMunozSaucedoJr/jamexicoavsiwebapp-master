import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../../../User_Interface/Organisms/Card/Card";
import { Button } from "../../../Indexes/AtomsIndexes";
import Swal from "sweetalert2";
import Post from "../../../../assets/images/jpg/Blog.jpg";
import data from "../../../../../backend/Data/DataPosts.js";

import app from "../../../../../backend/Firebase/Firebase-config.js";
import { getFirestore, collection, getDocs } from "firebase/firestore";
const db = getFirestore(app);

const Posts = () => {
  const [lista, setList] = useState([]);
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
        Swal.fire({
          icon: "error",
          title: "¡Carga erronea!",
          text: "No se han podido cargar los post's del blog. Por favor, contacte con el equipo de soporte para solucionar este error.",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 2000,
        });
        console.log(error);
      }
    };
    getList();
  }, [lista]);

  const [filter, setFilter] = useState("");

  const searchText = (event) => {
    setFilter(event.target.value);
  };

  let dataSearch = data.cardData.filter((item) => {
    return Object.keys(item).some((key) =>
      item[key]
        .toString()
        .toLowerCase()
        .includes(filter.toString().toLowerCase())
    );
  });

  return (
    <>
      {" "}
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 col-md-6 posts-left center">
            <h1>BLOG</h1>
            <Link to="/Home">
              <Button
                id="button"
                text="Volver al inicio"
                className="btn btn-open"
                type="button"
              />
            </Link>
          </div>
          <div className="col-sm-12 col-md-6 posts-right"></div>
          <div className="col-sm-12 col-md-12 posts-bottom">
            <div className="form-group pt-2 mb-2 text-center">
              <label
                htmlFor="search"
                className="form-label label-inmersive-blue"
              >
                Filtrar posts...
              </label>
              <input
                type="text"
                name="search"
                value={filter}
                id="search"
                placeholder="Filtre aquí..."
                className="form-control"
                onChange={searchText.bind(this)}
              />
            </div>
            <div className="row">
              {lista.map((list, index) => (
                <div className="col-sm-12 col-md-4 pt-4" key={index}>
                  <Card
                    imageUrl={Post}
                    alternativeTExt="Imagen de Card"
                    title={list.title}
                    cardText={list.category}
                    secondarycardText={list.content}
                  />
                </div>
              ))}
              {dataSearch.map((item, index) => {
                return (
                  <div className="col-sm-12 col-md-4 pt-3" key={index}>
                    <Card title={item.title} cardText={item.desc} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Posts;
