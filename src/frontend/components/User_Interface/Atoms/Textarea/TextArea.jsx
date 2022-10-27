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
  defaultValue,
  onKeyDown,
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
          onKeyDown={onKeyDown}
          onBlur={onBlur}
          readOnly={readOnly}
          disabled={disabled}
          inputMode={inputMode}
          pattern={pattern}
          defaultValue={defaultValue}
          title={title}
        />
      </div>
    </>
  );
};

export default TextArea;