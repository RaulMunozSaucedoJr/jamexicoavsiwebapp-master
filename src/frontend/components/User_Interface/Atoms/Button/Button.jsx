import React from "react";
const Button = ({
  id,
  text,
  className,
  type,
  value,
  onClick,
  onSubmit,
  databstoggle,
  databstarget,
}) => {
  return (
    <>
      <button
        type={type}
        id={id}
        className={className}
        value={value}
        onClick={onClick}
        onSubmit={onSubmit}
        data-bs-toggle={databstoggle}
        data-bs-target={databstarget}
      >
        {text}
      </button>
    </>
  );
};

export default Button;
