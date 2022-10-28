import React from "react";
import JAMexico from "../../../../assets/images/jpg/JAMEXICO.jpg";
import AvsiMexico from "../../../../assets/images/jpg/AVSI.jpg";
import EuropeUnion from "../../../../assets/images/jpg/UE.jpg";

export const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg sticky-top">
        <div className="container-fluid">
          <a href="https://www.jamexico.org.mx/">
            <img
              src={JAMexico}
              className="img-thumbnail"
              alt="Logo Navbar Desktop"
            />
          </a>
          <a href="https://www.eeas.europa.eu/delegations/m%C3%A9xico_es?s=248">
            <img
              src={EuropeUnion}
              className="img-thumbnail"
              alt="Logo Navbar Desktop"
            />
          </a>
          <a href="https://www.avsi.org/en/what-we-do/countries/mexico">
            <img
              src={AvsiMexico}
              className="img-thumbnail"
              alt="Logo Navbar Desktop"
            />
          </a>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
