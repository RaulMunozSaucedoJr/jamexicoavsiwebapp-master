import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer fixed">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-xl-12 center">
            <Link to="https://www.jamexico.org.mx/">
              <h1>JA-MEXICO / AVSI-MEXICO</h1>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
