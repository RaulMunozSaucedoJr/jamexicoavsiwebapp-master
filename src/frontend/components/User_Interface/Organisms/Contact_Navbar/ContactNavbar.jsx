import React from "react";
import { Link } from "react-router-dom";
import { CallTo, EmailTo } from "../../../Indexes/AtomsIndexes";

/* A React component. */
const ContactNavbar = () => {
  return (
    <>
      <div className="contact-navbar">
        <CallTo phone="+5552119444">
          <box-icon
            name="phone"
            type="solid"
            color="white"
            size="small"
          ></box-icon>
        </CallTo>
        <EmailTo email="comunicacion@jamexico.org.mx">
          <box-icon
            name="mail-send"
            type="regular"
            color="white"
            size="small"
          />
        </EmailTo>
        <Link to="/Home">
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
