import React from "react";
import { get } from "lodash";

const ValueContainer = (props) => {
    const getValueText = () => {
        const selectedLength = props.getValue().length
        return selectedLength > 1 ? `${selectedLength} selected` : `${props.getValue()[0].label}`;
    };
    return (
        <div className="value-container">
            {props.hasValue ? getValueText() : get(props, 'selectProps.placeholder', 'Select...')}
        </div>
    )
}

export default ValueContainer;