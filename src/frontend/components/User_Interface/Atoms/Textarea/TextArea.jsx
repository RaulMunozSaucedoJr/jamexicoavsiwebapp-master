import React from "react";

const TextArea = ({
  id,
  name,
  className,
  value,
  type,
  placeholder,
  titleLabel,
  label,
  onChange,
  disabled,
  readOnly,
  inputMode,
  onBlur,
  pattern,
  title,
}) => {
  return (
    <>
      <div className="form-group">
        <label className={titleLabel} htmlFor={id}>
          {label}
        </label>
        <textarea
          label={label}
          placeholder={placeholder}
          type={type}
          className={className}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          readOnly={readOnly}
          disabled={disabled}
          inputMode={inputMode}
          pattern={pattern}
          title={title}
        />
      </div>
    </>
  );
};

export default TextArea;