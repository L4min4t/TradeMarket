import useAuthContext from "../../../context/hooks";
import React from "react";
import {useNavigate} from "react-router-dom";
import {AuthLink, Container, Form, Input, Label, SubmitButton, SuggestText} from "../styles";

const LoginPage = () => {
    const {loginUser} = useAuthContext();
    const navigate = useNavigate();

    return (
        <Container>
            <Label>Login1</Label>
            <Form onSubmit={loginUser}>
                <Input type="text" name="email" placeholder="Email" required/>
                <Input type="password" name="password" placeholder="Password" required/>
                <SubmitButton type="submit">Login</SubmitButton>
            </Form>
            <SuggestText>
                Don't have an account? <AuthLink onClick={() => navigate("/register")}>Register</AuthLink>
            </SuggestText>
        </Container>
    );
};


export default LoginPage;