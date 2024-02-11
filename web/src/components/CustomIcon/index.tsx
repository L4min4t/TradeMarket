import React from "react";
import {StyledIcon, StyledIconProps} from "./styles";

const CustomIcon = (props: StyledIconProps) => {
    const imgUrl = `${process.env.REACT_APP_PUBLIC_URL}/images/${props.src}`;
    return (
        <StyledIcon
            src={imgUrl}
            width={props.width}
            height={props.height}
            
            aspectratio={props.aspectratio}
        />
    );
}

export default CustomIcon;