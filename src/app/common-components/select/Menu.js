import React, { useEffect, useRef, useState } from "react";
import { components } from "react-select";

const Menu = (props) => {
  const selectSearchInputRef = useRef(null);
  const [searchText, setSearchText] = useState("");
  const selectedLength = props.getValue().length;
  const availableLength = props.options.length;
  useEffect(() => {
    selectSearchInputRef.current.focus();
  }, []);
  const filterOptions = (e) => {
    setSearchText(e.target.value);
    // props.onSearch(searchText);
  };
  const handleChange = (e) => {
    setSearchText(e.target.value);
    props.selectProps.filterOptionsBySearch(e.target.value)
  }
  return (
    <div className="menu-container" onClick={() => {selectSearchInputRef.current.focus()}}>
      <div className="search">
        <input
          type="text"
          value={searchText}
          placeholder="Search"
          onChange={handleChange}
          ref={selectSearchInputRef}
        />
      </div>
      {availableLength !== 0 && (
        <button
          type="button"
          onClick={() =>
            selectedLength === availableLength
              ? props.selectProps.onChange([])
              : props.selectProps.onChange(props.options)
          }
        >
          {selectedLength === availableLength ? "Unselect all" : "Select all"}
        </button>
      )}
      <components.Menu {...props} className="menu">
        {props.children}
      </components.Menu>
    </div>
  );
};

export default Menu;
