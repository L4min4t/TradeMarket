import styled, {createGlobalStyle} from "styled-components";

export const cssValues = {
    textColor: "#000505",
    backgroundColor: "#FEFCFD",
    hoverBackgroundColor: "#BFCDE0",
    mainColor: "#3B3355",
    interactiveColor: "#4A3254",

    commonFontSize: "20px",
    titleFontSize: "36px",
    subTitleFontSize: "28px",
    fontFamily: "'Arial', sans-serif",

    borderRadius: "5px",
    border: "2px solid #3B3355",

    itemsGap: "12px",
    blocksGap: "45px",

    widthAuthForm: "400px",

    headerHeight: "70px",
    footerHeight: "55px",
    
    boxShadow: "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0," +
        " 0, 0, 0.3) 0px 30px 60px -30px;",
    hoverBoxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;",

}

const GlobalStyles = createGlobalStyle`
    * {
        font-family: ${cssValues.fontFamily};
        color: ${cssValues.textColor};
        font-size: ${cssValues.commonFontSize};
        font-weight: normal;
        text-decoration: none;
        padding: 0;
        margin: 0;
    }

    #root {
        min-height: 100vh;
    }

    html, body {
        min-height: 100vh;
        min-width: 100%;
    }
`;

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;
    min-height: 100vh;
`;

export const PageContentContainer = styled.div`
    display: flex;
    flex-direction: column;

    padding: 0 6%;

    width: calc(100% - 6% * 2);
    min-height: calc(100vh - ${cssValues.headerHeight} - ${cssValues.footerHeight});
`;


interface FlexContainerProps {
    display?: string;
    flexdirection?: string;
    justifycontent?: string;
    alignitems?: string;
    gap?: string;
    padding?: string;
    width?: string;
    background?: string;
    paddingtop?: string;
}

export const FlexContainer = styled.div<FlexContainerProps>`
    display: ${props => props.display || 'flex'};
    flex-direction: ${props => props.flexdirection || 'row'};
    justify-content: ${props => props.justifycontent || 'flex-start'};
    align-items: ${props => props.alignitems || 'flex-start'};
    ${props => props.gap && `gap: ${props.gap};`};
    ${props => props.padding && `padding: ${props.padding};`};
    ${props => props.width && `width: ${props.width};`};
    ${props => props.background && `background: ${props.background};`};
    ${props => props.paddingtop && `padding-top: ${props.paddingtop};`};
`;


interface StyledTitleProps {
    textoverflow?: string;
    width?: string;
}

export const StyledTitle = styled.h1<StyledTitleProps>`
    ${props => props.textoverflow && `text-overflow: ${props.textoverflow};`};
    ${props => props.width && `width: ${props.width};`};

    font-size: ${cssValues.titleFontSize};
    color: ${cssValues.textColor};
`;
export default GlobalStyles;