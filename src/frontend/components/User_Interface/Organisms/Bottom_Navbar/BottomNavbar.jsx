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
          {user ? (
            <>
              <div className="col-2 center mt-2">
                <Link to={Routing.Jobs}>
                  <box-icon
                    name="briefcase-alt-2"
                    type="solid"
                    color="white"
                    size="sm"
                  ></box-icon>
                </Link>
              </div>
              <div className="col-2 center mt-2">
                <Link to={Routing.Posts}>
                  <box-icon
                    name="book-content"
                    type="solid"
                    color="white"
                    size="sm"
                  ></box-icon>
                </Link>
              </div>
              <div className="col-4 center mt-2">
                <Link to={Routing.Interview}>
                  <box-icon
                    name="tv"
                    type="solid"
                    color="white"
                    size="sm"
                  ></box-icon>
                </Link>
              </div>
              <div className="col-2 center mt-2">
                <Link to={Routing.Tips}>
                  <box-icon
                    name="bulb"
                    type="solid"
                    color="white"
                    size="sm"
                  ></box-icon>
                </Link>
              </div>
              <div className="col-2 center mt-2">
                <Link to={Routing.Faqs}>
                  <box-icon name="question-mark" color="white" size="sm" />
                </Link>
              </div>
            </>
          ) : (
            <div className="col-12 center">
              <p></p>
            </div>
          )}

          <div className="col-5">
            {user ? (
              <Link to={Routing.PantallaChat}>
                <Button
                  type="button"
                  text="Chat"
                  className="btn btn-transparent text-white"
                />
              </Link>
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
          <div className="col-5 dropup-center dropup">
            {user ? (
              <>
                <button
                  type="button"
                  className="btn btn-transparent text-white dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Crear
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/CV">CV</Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link to="/Interview">Simulador</Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link to="/Profile">Perfil</Link>
                  </li>
                </ul>
              </>
            ) : (
              <Link to="/Faqs">
                <Button
                  type="button"
                  text="FAQ's"
                  className="btn btn-transparent text-white"
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BottomNavbar;
