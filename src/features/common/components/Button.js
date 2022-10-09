import React from "react";

const Button = ({ onClick }) => {
    return (
        <button
          class="solid-btn"
          onclick={(e) => onClick(e)}
        >
          Add New Tool
        </button>
    )
}
export default Button;