import React from "react";

const CallTo = ({ phone, children }) => {
  return (
    <>
      <a href={`tel:${phone}`}>{children}</a>
    </>
  );
};

export default CallTo;
