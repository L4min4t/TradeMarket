import React from "react";
import {StyledIcon, StyledIconProps} from "./styles";

const CustomIcon = (props: StyledIconProps) => (
    <StyledIcon
        src={`${process.env.REACT_APP_PUBLIC_URL}/images/${props.src}`}
        width={props.width}
        height={props.height}
        onClick={props.onClick}
        aspectratio={props.aspectratio}
    />
);


export default CustomIcon;