import React, { useRef } from "react";
import { components } from "react-select";


const Control = (props) => {
  const selectControlRef = useRef(null);
  return (
    <div onClick={() => props.selectProps.toggleMenu()}>
      <components.Control {...props} className="control" />
    </div>
  );
};

export default Control;
