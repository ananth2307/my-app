import React, { useEffect, useState, useRef, useCallback } from "react";
import Select from "react-select";
import Option from "./Option";
import "./select.styles.scss";
import Control from "./Control";
import ValueContainer from "./ValueContainer";
import Menu from "./Menu";
import MenuList from "./MenuList";
import DropdownIndicator from "./DropdownIndicator";
import IndicatorsContainer from "./IndicatorsContainer";
import CreatableSelect from "react-select/creatable";
import { get } from "lodash";

const CustomSelect = (props) => {
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setFilteredOptions(props?.options.length ? props.options : []);
  }, [props.options]);
  const getCustomComponents = () => {
    let components = {};
    if (props.isCheckboxSelect) {
      components = {
        Control,
        IndicatorsContainer,
        IndicatorSeparator: () => null,
        ValueContainer,
        Menu,
        MenuList,
        Option,
        DropdownIndicator,
      };
    }
    return components;
  };
  const getFilteredOptions = (searchText) => {
    setFilteredOptions(
      props?.options?.filter((option) =>
        option.label.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  };

  const toggleMenu = useCallback((status) => {
    if(status) {
      setIsMenuOpen(status);
    } else {
      setIsMenuOpen((state) => {
        return !state
      });
    }
  }, [isMenuOpen]);

  return (
    <Select
      {...props}
      components={getCustomComponents()} //Overrided reac-select components to match our theme style
      className="custom-select" //wrapper class name to have css parent selector for scoped styling
      isClearable={false}
      // noOptionsMessage={props.noOptionsMessage ? props.noOptionsMessage : "No results"}
      openMenuOnClick={true}
      backspaceRemovesValue={false} //keep this false for search input to get enabled otherwise keyboard events are overrided by react-select
      isSearchable={true}
      options={filteredOptions}
      filterOptionsBySearch={getFilteredOptions}
      menuIsOpen={isMenuOpen}
      toggleMenu={toggleMenu}
    />
  );
};

export default CustomSelect;
