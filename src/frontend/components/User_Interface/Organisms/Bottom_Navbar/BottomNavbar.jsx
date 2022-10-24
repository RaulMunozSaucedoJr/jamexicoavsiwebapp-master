import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Button } from "../../../Indexes/AtomsIndexes";
import * as Routing from "../../../../assets/javascript/constants/routing/routing.js";
import { UserAuth } from "../../../../context/AuthContext.js";

const BottomNavbar = () => {
  const { logOut, user } = UserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      Swal.fire({
        icon: "success",
        title: "Sesión cerrada",
        text: "La sesión se ha cerrado correctamente",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 4000,
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "La sesión NO se ha podido cerrado correctamente. Contacte al equipo de ayuda en la barra lateral de contacto.",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 4000,
      });
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="container-fluid fixed-bottom" id="mobile-nav">
        <div className="row">
          <div className="col-2 center">
            <Link to={Routing.Jobs}>
              <box-icon
                name="briefcase-alt-2"
                type="solid"
                color="white"
                size="sm"
              ></box-icon>
            </Link>
          </div>
          <div className="col-2 center">
            <Link to={Routing.Posts}>
              <box-icon
                name="book-content"
                type="solid"
                color="white"
                size="sm"
              ></box-icon>
            </Link>
          </div>
          <div className="col-4 center">
            <div className="dropup dropup-center">
              <button type="button" className="btn" data-bs-toggle="dropdown">
                <box-icon
                  type="solid"
                  name="plus-square"
                  color="white"
                  size="sm"
                  animation="flashing"
                ></box-icon>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <Link to={Routing.CmsBlog}>CMS Blog</Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link to={Routing.CmsEmployments}>CMS Jobs</Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link to={Routing.CmsFaqs}>CMS Faqs</Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link to={Routing.Profile}>CMS Profile</Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link to={Routing.CmsResume}>CMS CV</Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link to={Routing.CmsTips}>CMS Tips</Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link to="/CmsUsers">CMS Users</Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link to={Routing.PantallaChat}>Chat</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-2 center">
            <Link to={Routing.Profile}>
              <box-icon
                name="id-card"
                type="solid"
                color="white"
                size="sm"
              ></box-icon>
            </Link>
          </div>
          <div className="col-2 center">
            <Link to={Routing.Tips}>
              <box-icon
                name="bulb"
                type="solid"
                color="white"
                size="sm"
              ></box-icon>
            </Link>
          </div>
          <div className="col-5">
            {user ? (
              <p className="text-center text-white">Logeado</p>
            ) : (
              <Link to={Routing.Register}>
                <Button
                  type="button"
                  text="Registrate"
                  className="btn btn-transparent text-white"
                />
              </Link>
            )}
          </div>
          <div className="col-2 center">
            {user ? (
              <Link to={Routing.Login}>
                <Button
                  type="button"
                  text="Salir"
                  className="btn btn-open"
                  onClick={handleLogout}
                />
              </Link>
            ) : (
              <Link to={Routing.Login}>
                <Button
                  type="button"
                  text="Ingresar"
                  className="btn btn-open"
                />
              </Link>
            )}
          </div>
          <div className="col-5">
            <Button
              type="button"
              text="Arriba"
              className="btn btn-transparent text-white"
              onClick={() => {
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BottomNavbar;
