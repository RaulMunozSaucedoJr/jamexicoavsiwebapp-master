import React from "react";
import JAMexico from "../../../../assets/images/jpg/JAMEXICO.jpg";
import AvsiMexico from "../../../../assets/images/jpg/AVSI.jpg";
import EuropeUnion from "../../../../assets/images/jpg/UE.jpg";

export const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg sticky-top">
        <div className="container-fluid">
          <img
            src={JAMexico}
            className="img-thumbnail"
            alt="Logo Navbar Desktop"
          />
          <img
            src={EuropeUnion}
            className="img-thumbnail"
            alt="Logo Navbar Desktop"
          />
          <img
            src={AvsiMexico}
            className="img-thumbnail"
            alt="Logo Navbar Desktop"
          />
        </div>
      </nav>
    </>
  );
};
export default Navbar;
