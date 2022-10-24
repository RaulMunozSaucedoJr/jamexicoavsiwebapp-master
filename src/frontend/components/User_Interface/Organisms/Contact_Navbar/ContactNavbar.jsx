import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as Routing from "../../../../assets/javascript/constants/routing/routing.js";
import { EmailTo } from "../../../Indexes/AtomsIndexes";

/* A React component. */
const ContactNavbar = () => {
  const [show, setShow] = useState(true);
  const controlNavbar = () => {
      window.scrollY > 400 ? setShow(false) : setShow(true);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, []);

  return (
    <>
      <div className={`.contact-navbar ${show && "contact-navbar"}`}>
        <EmailTo email="comunicacion@jamexico.org.mx">
          <box-icon
            name="mail-send"
            type="regular"
            color="white"
            size="small"
          />
        </EmailTo>
        <Link to={Routing.Home}>
          <box-icon
            name="home-alt-2"
            type="solid"
            color="white"
            size="small"
          ></box-icon>
        </Link>
      </div>
    </>
  );
};

export default ContactNavbar;
