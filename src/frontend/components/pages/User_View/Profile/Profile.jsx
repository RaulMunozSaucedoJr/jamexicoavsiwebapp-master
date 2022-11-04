import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FetchCurrentUserData } from "../../../../../backend/Firebase/Functions/Functions";
import { auth } from "../../../../../backend/Firebase/Firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";

const Profile = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return navigate("/");
    FetchCurrentUserData();
    // eslint-disable-next-line
  }, [user]);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 profile-left center">
            <h1>Perfil del usuario:</h1>
          </div>
          <div className="col-12 profile-right"></div>
          <div className="col-12 profile-bottom center">
            <div className="row">
              <div className="col-12">
                <button
                  type="button"
                  class="btn btn-open"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Ver información de perfil
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen-sm-down modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Información del usuario
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h6>Correo del usuario:</h6>
              <p>{user?.email}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
