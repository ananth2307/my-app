import React from "react";
import Select from "react-select";
// import CustomSelect from "../../../app/common-components/select";

const Dropdown = (props) => {
  return (
    <Select
      options={props.options}
      {...props}
    />
  );
};

export default Dropdown;
