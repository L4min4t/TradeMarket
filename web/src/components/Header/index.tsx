import useAuthContext from "../../context/hooks";
import {Greeting, HeaderContainer, Logo, UserName} from "./styles";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const Header = () => {
    const {user, jwtTokens, logoutUser} = useAuthContext();
    const navigate = useNavigate();

    if (user == null || jwtTokens == null) {
        toast.error("User auth error!");
        console.log(user);
        logoutUser();
        navigate("/login");
    }

    return (
        <HeaderContainer>
            <Logo onClick={() => navigate("/")}>TradeMarket</Logo>
            <Greeting>Hello, <UserName onClick={logoutUser}>{user?.name}</UserName>!</Greeting>
        </HeaderContainer>);
}
export default Header;