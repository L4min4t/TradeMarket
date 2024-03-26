import useAuthContext from "../../context/hooks";
import {useEffect, useState} from "react";
import {getUser, User} from "../../api/user";
import UserDetail from "../../components/User/UserDetail";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const UserPage = () => {
    const {user} = useAuthContext();
    const {jwtTokens} = useAuthContext();
    const [userInfo, setUserInfo] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function getResponse() {
            if (user) {
                const result = await getUser(jwtTokens!.accessToken, user!.id);
                if (result) setUserInfo(result as User);
                else {
                    toast.error("Failed loading user information!");
                    navigate("/login");
                }
            } else {
                toast.error("Invalid logged-in user!");
                navigate("/login");
            }
        }

        getResponse();
    }, [user, jwtTokens]);

    return userInfo ? <UserDetail key={user!.id} userObj={userInfo}/> : <></>;
}

export default UserPage;