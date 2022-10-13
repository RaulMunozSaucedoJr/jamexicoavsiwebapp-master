import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../Indexes/AtomsIndexes";
import Swal from "sweetalert2";
import Card from "../../../User_Interface/Organisms/Card/Card";
import Profiles from "../../../../assets/images/jpg/profile.jpg";
import data from "../../../../../backend/Data/DataProfiles.js";
import app from "../../../../../backend/Firebase/Firebase-config";
import { getFirestore, collection, getDocs } from "firebase/firestore";
const db = getFirestore(app);

const Profile = () => {
  const [lista, setList] = useState([]);
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
        Swal.fire({
          icon: "error",
          title: "¡Carga erronea!",
          text: "No se han podido cargar los trabajos. Por favor, contacte con el equipo de soporte para solucionar este error.",
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
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12 col-md-6 profiles-left center">
          <h1>Perfiles</h1>
          <Link to="/Home">
            <Button
              type="button"
              id="button"
              text="Volver al inicio"
              className="btn btn-open"
            />
          </Link>
        </div>
        <div className="col-sm-12 col-md-6 profiles-right center"></div>
        <div className="col-sm-12 col-md-12 profiles-bottom pt-1">
          <div className="form-group pt-2 mb-2 text-center">
            <label htmlFor="search" className="form-label label-inmersive-blue">
              Filtrar perfiles...
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
            {lista.map((list) => (
              <div className="col-sm-12 col-md-4">
                <Card
                  imageUrl={Profiles}
                  alternativeTExt="Imagen de Card"
                  title={list.user}
                  cardText={list.complete_name}
                  secondarycardText={list.email}
                  smallText={list.date}
                />
              </div>
            ))}
            {dataSearch.map((item, index) => {
              return (
                <div className="col-sm-12 col-md-4 pt-3">
                  <Card title={item.title} cardText={item.desc} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
