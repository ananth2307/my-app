import React from "react";

const Input = (props) => {
  let  {
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
    autoComplete,
    maxLength
  } = props;

  inputClassName = error ? 'errorinput' : inputClassName

  return (
    <>
        <div
          className={`${containerClassName}`}
        >
          <div className={`frmhead ${labelClassName}`}>
            {label && <label>{label} </label> }
            {error && (
              <div className={`error ${errorClassName}`}>*{errorMessage}</div>
            )}
          </div>
          <input
            type={type}
            value={value}
            onChange={(e)=> {onChange(e.target.name, e.target.value) }}
            name={name}
            placeholder={placeholder}
            className={`${inputClassName}`}
            autoComplete={autoComplete}
            maxLength={maxLength}
          />
        </div>
    </>
  );
};

export default Input;
