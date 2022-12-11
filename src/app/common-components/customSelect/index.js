import React, { useState } from "react";
import { formCustomStyle } from "../../../features/efficiency/constants";
import Select from "react-select";

const CustomSelection = (props) => {
  const { placeholder, onChange, onInputChange, options, name, menuIsOpen, error,errorMessage } =
    props;

  const { dropDownState, selectedField } = onInputChange;

  const colourStyles = {
    control: (styles) => ({ ...styles, ...formCustomStyle }),
  };

  return (
    <div class="frmgroup">
      {error && <div class="frmhead">
        <div class="error" >{errorMessage}</div>
      </div>}
      
      <Select
        name={name}
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
        }}
        styles={colourStyles}
        options={options}
        onInputChange={(input) => dropDownState(input, selectedField)}
        onChange={(choice, action) => {
          onChange(action.name, choice);
        }}
        menuIsOpen={menuIsOpen}
        placeholder={placeholder}
      />
    </div>
  );
};

export default CustomSelection;
