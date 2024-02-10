import React, {useContext} from "react";
import AuthContext from "../../context/AuthContex";
import {
    cssValues,
    LoginRegisterContainer,
    StyledButton,
    StyledForm,
    StyledInput, StyledLinkButton,
    StyledTitle
} from "../../components/GlobalStyles";
import {useNavigate} from "react-router-dom";

const RegisterPage = () => {
    const {registerUser} = useContext(AuthContext)!;
    const navigate = useNavigate();

    return (
        <LoginRegisterContainer flexDirection={"column"} gap={cssValues.itemsGap}>
            <StyledTitle>Register</StyledTitle>
            <StyledForm onSubmit={registerUser}>
                <StyledInput type="text" name="email" placeholder="Email" required/>
                <StyledInput
                    type="text"
                    name="username"
                    placeholder="Name"
                    required
                />
                <StyledInput
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                />
                <StyledButton type="submit">Register</StyledButton>
            </StyledForm>
            <p>Already have an account? <StyledLinkButton onClick={() => navigate("/login")}>Login</StyledLinkButton></p>
        </LoginRegisterContainer>
    );
};

export default RegisterPage;