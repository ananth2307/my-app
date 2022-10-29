import React from "react";

const Button = ({ onClick, text, className }) => {
    return (
        <button
          className={className ? className : `solid-btn`}
          onclick={(e) => onClick(e)}
        >
          {text}
        </button>
    )
}
export default Button;