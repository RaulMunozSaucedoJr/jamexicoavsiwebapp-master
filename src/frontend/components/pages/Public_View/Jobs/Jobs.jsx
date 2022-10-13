import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "../../../Indexes/OrganismsIndex";
import { Button } from "../../../Indexes/AtomsIndexes";
import Swal from "sweetalert2";
import data from "../../../../../backend/Data/DataJobs";
import app from "../../../../../backend/Firebase/Firebase-config.js";
import { getFirestore, collection, getDocs } from "firebase/firestore";
const db = getFirestore(app);

const Jobs = () => {
  const [lista, setList] = useState([]);
  useEffect(() => {
    const getList = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "trabajos"));
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setList(docs);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "¡Carga erronea!",
          text: "No se han podido cargar los trabajos. Por favor, contacte con el equipo de soporte.",
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
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 col-md-6 jobs-left center">
            <h1>Bolsas de empleo</h1>
            <Link to="/Home">
              <Button
                id="button"
                text="Volver al inicio"
                className="btn btn-open"
                type="button"
              />
            </Link>
          </div>
          <div className="col-sm-12 col-md-6 jobs-right"></div>
          <div className="col-sm-12 col-md-12 jobs-bottom">
            <div className="form-group pt-2 mb-2 text-center">
              <label
                htmlFor="search"
                className="form-label label-inmersive-blue"
              >
                Filtrar bolsas de empleo...
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
                  <div className="card">
                    <div className="card-body">
                      <div className="card-title">{list.title}</div>
                      <p className="card-text">{list.category}</p>
                      <p className="card-text">{list.descripcion}</p>
                      <p className="card-text">{list.web_url}</p>
                    </div>
                  </div>
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

export default Jobs;
