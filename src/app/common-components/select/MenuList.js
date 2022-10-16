import React from "react";
import { components } from "react-select";

const MenuList = (props) => {
  return (
    <components.MenuList {...props} className="menu-list">
      {props.children}
    </components.MenuList>
  );
};

export default MenuList;
