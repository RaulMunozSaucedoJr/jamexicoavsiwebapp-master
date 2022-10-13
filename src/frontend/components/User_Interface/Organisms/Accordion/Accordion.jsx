import React, { useState } from "react";

const Accordion = ({ pregunta, respuesta }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="accordion-item">
      <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
        <div>{pregunta}</div>
        <div>{isActive ? "-" : "+"}</div>
      </div>
      {isActive && <div className="accordion-content">{respuesta}</div>}
    </div>
  );
};

export default Accordion;