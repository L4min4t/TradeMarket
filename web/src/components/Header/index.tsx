import useAuthContext from "../../context/hooks";
import {cssValues, FlexContainer, StyledLinkButton, StyledSubTitle} from "../GlobalStyles";
import {StyledLogo} from "./style";
import {useNavigate} from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
    const {user, logoutUser} = useAuthContext();
    const navigate = useNavigate();
    
    if (user == null) {
        toast.error("User login error!");
        console.log(user);
        logoutUser();
        navigate("/login");
    }
    
    return (
        <FlexContainer padding={"0 10vw"} justifyContent={"space-between"} alignItems={"center"} width={"calc(100% -" +
            " 20vw)"} background={cssValues.mainColor}>
            <StyledLogo>Trade Market</StyledLogo>
            <StyledSubTitle>
                Hello, <StyledLinkButton fontSize={cssValues.subTitleFontSize}
                                         fontWeight={"bold"}
                                         onClick={() => navigate("/user")}>{user?.name}</StyledLinkButton>!
            </StyledSubTitle>
        </FlexContainer>);
}
export default Header;