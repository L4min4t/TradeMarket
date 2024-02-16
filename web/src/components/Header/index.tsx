import useAuthContext from "../../context/hooks";
import {Greeting, HeaderContainer, Logo, UserName} from "./styles";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const Header = () => {
    const {user, jwtTokens} = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || !jwtTokens) navigate("/login");
    }, [user, jwtTokens]);

    return (
        <HeaderContainer>
            <Logo onClick={() => navigate("/")}>TradeMarket</Logo>
            <Greeting>Hello, <UserName onClick={() => navigate("/user")}>{user?.name}</UserName>!</Greeting>
        </HeaderContainer>);
}
export default Header;