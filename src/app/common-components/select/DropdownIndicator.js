import React from "react";
import images from "../../../assets/images/index";
import { components } from "react-select";

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <img src={images.downCaret} />
    </components.DropdownIndicator>
  );
};

export default DropdownIndicator;
