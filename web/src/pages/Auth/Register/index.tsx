import React, {useContext} from "react";
import AuthContext from "../../../context/AuthContex";
import {useNavigate} from "react-router-dom";
import {AuthLink, Container, Form, Input, Label, SubmitButton, SuggestText} from "../styles";

const RegisterPage = () => {
    const {registerUser} = useContext(AuthContext)!;
    const navigate = useNavigate();

    return (
        <Container>
            <Label>Register</Label>

            <Form onSubmit={registerUser}>
                <Input type="text" name="email" placeholder="Email" required/>
                <Input type="text" name="username" placeholder="Name" required/>
                <Input type="password" name="password" placeholder="Password" required/>
                <SubmitButton type="submit">register</SubmitButton>
            </Form>

            <SuggestText>
                Already have an account? <AuthLink onClick={() => navigate("/login")}>Login</AuthLink>
            </SuggestText>
        </Container>
    );
};

export default RegisterPage;