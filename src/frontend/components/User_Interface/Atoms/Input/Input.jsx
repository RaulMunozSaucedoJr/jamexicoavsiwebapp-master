import React from "react";

const Input = ({
  id,
  name,
  className,
  value,
  type,
  placeholder,
  titleLabel,
  label,
  autoComplete,
  onChange,
  disabled,
  readOnly,
  inputMode,
  onBlur,
  pattern,
  title,
  accept,
  defaultValue
}) => {
  return (
    <>
      <div className="form-group">
        <label className={titleLabel} htmlFor={id}>
          {label}
        </label>
        <input
          label={label}
          placeholder={placeholder}
          type={type}
          className={className}
          name={name}
          id={id}
          value={value}
          autoComplete={autoComplete}
          onChange={onChange}
          onBlur={onBlur}
          readOnly={readOnly}
          disabled={disabled}
          inputMode={inputMode}
          pattern={pattern}
          title={title}
          accept={accept}
          defaultValue={defaultValue}
        />
      </div>
    </>
  );
};

export default Input;
