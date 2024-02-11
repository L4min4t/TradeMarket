import useAuthContext from "../../context/hooks";
import {Greeting, HeaderContainer, Logo, UserName} from "./styles";
import {useNavigate} from "react-router-dom";

const Header = () => {
    const {user, logoutUser} = useAuthContext();
    const navigate = useNavigate();

    return (
        <HeaderContainer>
            <Logo onClick={() => navigate("/")}>TradeMarket</Logo>
            <Greeting>Hello, <UserName onClick={logoutUser}>{user?.name}</UserName>!</Greeting>
        </HeaderContainer>);
}
export default Header;