import React from "react";

const Input = (props) => {
  const {
    label,
    error,
    errorMessage,
    value,
    type,
    name,
    placeholder,
    onChange,
    containerClassName,
    labelClassName,
    errorClassName,
    inputClassName,
  } = props;

  return (
    <>
        <div
          className={`frmgroup validate default-input col-6 ${containerClassName}`}
        >
          <div className={`frmhead ${labelClassName}`}>
            <label>{label} </label>
            {error && (
              <div className={`error${errorClassName}`}>*{errorMessage}</div>
            )}
          </div>
          <input
            type={type}
            value={value}
            onChange={onChange}
            name={name}
            placeholder={placeholder}
            className={`${inputClassName}`}
          />
        </div>
    </>
  );
};

export default Input;
