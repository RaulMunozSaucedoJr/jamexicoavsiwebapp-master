import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../Indexes/AtomsIndexes";
const Interview = ({ user }) => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 interview-left center">
            <h1>Simulador de entrevistas</h1>
            <Link to="/">
              <Button
                type="button"
                text="Regresar al inicio"
                className="btn btn-open"
              />
            </Link>
          </div>
          <div className="col-12 interview-right"></div>
          <div className="col-12 interview-bottom">
            <div className="row">
              <div className="col-12 pt-4">
                <div className="alert alert-success" role="alert">
                  <h6>
                    <strong>
                      Se le recuerda que tiene que regresar a esta plataforma y cerrar sesión.
                    </strong>
                  </h6>
                </div>
              </div>
              <div className="col-12 pt-2">
                {user.rol === "superadmin" ? (
                  <>
                    <a
                      rel="nofollow noopener noreferrer"
                      href="https://app.videosdk.live/rooms/JAMEXICOAVSI/Host_635f7e477d2bddb5ef7d630c/ade9-6id7-x5wt"
                    >
                      <Button
                        type="button"
                        className="btn btn-open"
                        text="Ingresar como entrevistador"
                      />
                    </a>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className="col-12 pt-2">
                {user.rol === "admin" ? (
                  <>
                    <a
                      rel="nofollow noopener noreferrer"
                      href="https://app.videosdk.live/rooms/JAMEXICOAVSI/Host_635f7e477d2bddb5ef7d630c/ade9-6id7-x5wt"
                    >
                      <Button
                        type="button"
                        className="btn btn-open"
                        text="Ingresar como entrevistador"
                      />
                    </a>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className="col-12 pt-2">
                {user.rol === "user" ? (
                  <>
                    <a
                      rel="nofollow noopener noreferrer"
                      href="https://app.videosdk.live/rooms/JAMEXICOAVSI/Guest_635f7e477d2bdd7bd77d630e/ade9-6id7-x5wt"
                    >
                      <Button
                        type="button"
                        className="btn btn-open"
                        text="Ingresar como estudiante"
                      />
                    </a>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Interview;
