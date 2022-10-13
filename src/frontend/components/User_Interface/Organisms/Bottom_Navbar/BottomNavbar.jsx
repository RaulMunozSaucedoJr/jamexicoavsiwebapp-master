import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Button } from "../../../Indexes/AtomsIndexes";
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
      navigate("/Home");
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
            <Link to="Jobs">
              <box-icon
                name="briefcase-alt-2"
                type="solid"
                color="white"
                size="md"
              ></box-icon>
            </Link>
          </div>
          <div className="col-2 center">
            <Link to="/Posts">
              <box-icon
                name="book-content"
                type="solid"
                color="white"
                size="md"
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
                  size="md"
                  animation="flashing"
                ></box-icon>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/CmsBlog">CMS Blog</Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link to="/CmsEmployments">CMS Jobs</Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link to="/CmsFaqs">CMS Faqs</Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link to="/CmsUserProfile">CMS Profile</Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link to="/CMSResume">CMS CV</Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link to="/CmsTips">CMS Tips</Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link to="/CMSUsers">CMS Users</Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link to="/PantallaChat">Chat</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-2 center">
            <Link to="/Profile">
              <box-icon
                name="id-card"
                type="solid"
                color="white"
                size="md"
              ></box-icon>
            </Link>
          </div>
          <div className="col-2 center">
            <Link to="/Tips">
              <box-icon
                name="bulb"
                type="solid"
                color="white"
                size="md"
              ></box-icon>
            </Link>
          </div>
          <div className="col-5">
            <Link to="/Register">
              <Button
                type="button"
                text="Registrate"
                className="btn btn-transparent text-white"
              />
            </Link>
          </div>
          <div className="col-2 center">
            {user ? (
              <Link to="/Login">
                <Button
                  type="button"
                  text="Logout"
                  className="btn btn-open"
                  onClick={handleLogout}
                />
              </Link>
            ) : (
              <Link to="/Login">
                <Button type="button" text="Login" className="btn btn-open" />
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
