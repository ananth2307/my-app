import React from "react";
const CustomOption = ({ innerProps, label, isSelected, selectProps }) => {
  return (
    <div {...innerProps} className={`option ${isSelected && "selected" }`}>
        <label htmlFor={innerProps.id} >
            <input type="checkbox" checked={isSelected} id={innerProps.id} onChange={() => null} />
            {label}
        </label>
    </div>
  )
}

export default CustomOption;
