import {FlexContainer, StyledTitle} from "../../components/GlobalStyles";
import styled from "styled-components";

const NotFound = () => {
    return (
        <StyledNotFoundContainer flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
            <StyledTitle>Page Not Found</StyledTitle>
        </StyledNotFoundContainer>
    );
};

const StyledNotFoundContainer = styled(FlexContainer)`
    padding: 20vh 0 0 0;
    text-align: center;
    width: 100%;
`;

export default NotFound;