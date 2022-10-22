import React from "react";
import { downCaret } from "../../../assets/images/index";
import { components } from "react-select";

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <img src={downCaret} />
    </components.DropdownIndicator>
  );
};

export default DropdownIndicator;
