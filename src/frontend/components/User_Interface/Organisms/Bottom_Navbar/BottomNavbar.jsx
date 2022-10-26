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
      navigate("/Login");
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
            <p className="text-white">
              <strong>¡Hola!</strong>
            </p>
          </div>
          <div className="col-2 center">
            <Link to={Routing.Faqs}>
              <box-icon
                name="book-content"
                type="solid"
                color="white"
                size="sm"
              ></box-icon>
            </Link>
          </div>
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
