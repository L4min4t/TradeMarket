import useAuthContext from "../../context/hooks";
import {Greeting, HeaderContainer, Logo, UserName} from "./styles";
import {useNavigate} from "react-router-dom";

const Header = () => {
    const {user} = useAuthContext();
    const navigate = useNavigate();

    return (
        <HeaderContainer>
            <Logo onClick={() => navigate("/")}>TradeMarket</Logo>
            <Greeting>Hello, <UserName onClick={() => navigate("/user")}>{user?.name}</UserName>!</Greeting>
        </HeaderContainer>);
}
export default Header;