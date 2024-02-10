import styled, {createGlobalStyle } from "styled-components";

export const cssValues  = {
    textColor: "#000505",
    backgroundColor: "#FEFCFD",
    hoverBackgroundColor: "#BFCDE0",
    mainColor: "#3B3355",
    interactiveColor: "#4A3254",
    
    commonFontSize: "14pt",
    titleFontSize: "26pt",
    subTitleFontSize: "20pt",
    fontFamily: "'Arial', sans-serif",
    
    borderRadius: "5px",
    border: "2px solid #3B3355",
    
    padding: "3%",
    rectPadding: "1.5% 4%",
    
    itemsGap: "12px",
    blocksGap: "45px",
    
    widthAuthForm : "500px",
    
}

const GlobalStyles = createGlobalStyle`
    * {
        font-family: ${cssValues.fontFamily};
        color: ${cssValues.textColor};
        font-size: ${cssValues.commonFontSize};
        text-decoration: none;
        padding: 0;
        margin: 0;
    }

    html, body {
        height: 100vh;
    }
`;

  

interface FlexContainerProps {
    display?: string;
    flexDirection?: string;
    justifyContent?: string;
    alignItems?: string;
    gap?: string;
    padding?: string;
    width?: string;
    background?: string;
}

export const FlexContainer = styled.div<FlexContainerProps>`
    display: ${props => props.display || 'flex'};
    flex-direction: ${props => props.flexDirection || 'row'};
    justify-content: ${props => props.justifyContent || 'flex-start'};
    align-items: ${props => props.alignItems || 'flex-start'};
    ${props => props.gap && `gap: ${props.gap};`};
    ${props => props.padding && `padding: ${props.padding};`};
    ${props => props.width && `width: ${props.width};`};
    ${props => props.background && `background: ${props.background};`};
`;

interface StyledButtonProps {
    width?: string;
    height?: string;
    background?: string;
    color?: string;
    borderRadius?: string;
    border?: string;
    padding?: string;
}

export const StyledButton = styled.button<StyledButtonProps> `
    width: ${props => props.width || 'fit-content'};
    height: ${props => props.height || 'fit-content'};
    background: ${props => props.background || cssValues.hoverBackgroundColor};
    color: ${props => props.color || cssValues.textColor};
    border-radius: ${props => props.borderRadius || cssValues.borderRadius};
    border: ${props => props.border || cssValues.border};
    padding: ${props => props.padding || cssValues.rectPadding};
    align-items: center;
    align-content: center;
    
    &:hover {
        background: ${cssValues.interactiveColor};
    }
`;

interface StyledLinkButtonProps {
    fontWeight?: string;
    fontSize?: string;
    color?: string;
}

export const StyledLinkButton = styled.button<StyledLinkButtonProps> `
    ${props => props.fontWeight && `font-weight: ${props.fontWeight};`};
    ${props => props.fontSize && `font-size: ${props.fontSize};`};
    color: ${props => props.color || cssValues.textColor};
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
`;

export const StyledForm = styled.form `
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 10px;
`;


// Create a styled input with an animated gradient border
export const StyledInput = styled.input`
    width: calc(100% - ${cssValues.padding} * 2);
    border: ${cssValues.border};
    border-radius: ${cssValues.borderRadius};
    padding: ${cssValues.padding};
    
    &:hover {
        border-color: ${cssValues.interactiveColor};
    }
    
    &:focus {
        outline-color: ${cssValues.interactiveColor};
    }
`;

export const StyledTitle = styled.h1 `
    font-size: ${cssValues.titleFontSize};
    color: ${cssValues.textColor};
`;

export const StyledSubTitle = styled.h2 `
    font-size: ${cssValues.subTitleFontSize};
    color: ${cssValues.textColor};
`;

export const LoginRegisterContainer = styled(FlexContainer) `
    margin: 20vh auto;
    width: ${cssValues.widthAuthForm};
`;
export default GlobalStyles;