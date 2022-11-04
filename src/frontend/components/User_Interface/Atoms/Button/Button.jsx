import React from "react";
/**
 * This function returns a button element with the following attributes: type, id, className, value,
 * onClick, onSubmit, data-bs-toggle, data-bs-target, and disabled
 * @returns A button with the following properties:
 * - type
 * - id
 * - className
 * - value
 * - onClick
 * - onSubmit
 * - data-bs-toggle
 * - data-bs-target
 * - disabled
 */
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
  disabled,
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
        disabled={disabled}
      >
        {text}
      </button>
    </>
  );
};

export default Button;
