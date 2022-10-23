import React from "react";

const Button = ({ onClick, text }) => {
    return (
        <button
          className="solid-btn"
          onclick={(e) => onClick(e)}
        >
          {text}
        </button>
    )
}
export default Button;