import React from "react";

const EmailTo = ({ email, children }) => {
  return (
    <>
      <a href={`mailto:${email}`}>{children}</a>
    </>
  );
};

export default EmailTo;
