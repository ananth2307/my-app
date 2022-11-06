import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from "./Button";
import { setIsOffCanvasOpen } from "../commonSlice";

const CustomOffCanvas = (props) => {
  
  const dispatch = useDispatch();
  const isOffCanvasOpen = useSelector((state) => state.common?.offcanvasState?.isDrilldownOpen)

  return (
    <Offcanvas
      placement="end"
      className={props.className}
      show={isOffCanvasOpen}
    >
      <Button
        className="btn-close text-reset"
        text="×"
        onClick={() => dispatch(setIsOffCanvasOpen(false))}
      />
      {props?.children}
    </Offcanvas>
  );
};

export default CustomOffCanvas;
