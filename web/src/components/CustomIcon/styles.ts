import styled from "styled-components";

export interface StyledIconProps {
    width?: string;
    height?: string;
    aspectratio?: string;
    src: string;
    onClick?: () => void;
}

export const StyledIcon = styled.img<StyledIconProps>`
    ${props => props.width && `width: ${props.width};`};
    ${props => props.height && `height: ${props.height};`};
    ${props => props.aspectratio && `aspect-ratio: ${props.aspectratio};`};
`;