import React from "react";
import * as Routing from "../../../../assets/javascript/constants/routing/routing.js";
import { Button } from "../../../Indexes/AtomsIndexes";
import { Link } from "react-router-dom";

const Error_404 = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 error-left center">
            <h1>
              ¡Lo sentimos, <b>NO</b> encontramos el recurso que estabas
              buscando!.
            </h1>
            <Link to={Routing.Home}>
              <Button
                id="button"
                text="Volver al inicio"
                className="btn btn-open"
                type="button"
              />
            </Link>
          </div>
          <div className="col-md-6 error-right"></div>
        </div>
      </div>
    </>
  );
};

export default Error_404;
