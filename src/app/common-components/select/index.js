import React, { useState } from "react";
import Select from "react-select";
import Option from "./Option";
import "./select.styles.scss";
import Control from "./Control";
import IndicatorContainer from "./IndicatorContainer";
import IndicatorSeparator from "./IndicatorSeperator";
import ValueContainer from "./ValueContainer";
import Menu from "./Menu";
import MenuList from "./MenuList";
import DropdownIndicator from "./DropdownIndicator";
import CreatableSelect from 'react-select/creatable';

const CustomSelect = (props) => {
  const [options, setOptions] = useState(props.options.length ? props.options : []);
  const getCustomComponents = () => {
    let components = {};
    if (props.isCheckboxSelect) {
      components = {
        Control,
        IndicatorContainer,
        IndicatorSeparator,
        ValueContainer,
        Menu,
        MenuList,
        Option,
        DropdownIndicator
      };
    }
    return components;
  };
  const onSearch = (data) => {
    console.log('onSearch', data)
  }
  return (
    <Select
      {...props}
      components={getCustomComponents()}
      className="custom-select"
      isClearable={false}
      // noOptionsMessage={props.noOptionsMessage ? props.noOptionsMessage : "No results"}
      openMenuOnClick={true}
      backspaceRemovesValue={false}
    />
  );
};

export default CustomSelect;
