import React from "react";
import { components } from "react-select";

const IndicatorContainer = (props) => {
    return (
        <components.IndicatorsContainer {...props}>
            {props.children}
        </components.IndicatorsContainer>
    )
}

export default IndicatorContainer;