import useAuthContext from "../../context/hooks";
import {
    cssValues,
    FlexContainer,
    LoginRegisterContainer,
    StyledButton,
    StyledForm,
    StyledInput, StyledLinkButton, StyledTitle
} from "../../components/GlobalStyles";
import React from "react";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
    const { loginUser } = useAuthContext();
    const navigate = useNavigate();

    return (
        <LoginRegisterContainer flexDirection={"column"} gap={cssValues.itemsGap} justifyContent={"center"}>
            <StyledTitle>Login</StyledTitle>
            <StyledForm onSubmit={loginUser}>
                <StyledInput type="text" name="email" placeholder="Email" required/>
                <StyledInput type="password" name="password" placeholder="Password" required/>
                <StyledButton type="submit">Login</StyledButton>
            </StyledForm>
            <p>Don't have an account? <StyledLinkButton onClick={() => navigate("/register")}>Register</StyledLinkButton>
            </p>
        </LoginRegisterContainer>
    );
};


export default LoginPage;