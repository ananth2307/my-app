import React from "react";
const CustomOption = ({ innerProps, label, isSelected }) => {
  return (
    <div {...innerProps} className={`option ${isSelected && "selected" }`}>
        <label for={innerProps.id} >
            <input type="checkbox" checked={isSelected} id={innerProps.id} />
            {label}
        </label>
    </div>
  )
}

export default CustomOption;
