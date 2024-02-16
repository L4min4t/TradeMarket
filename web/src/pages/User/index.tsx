import useAuthContext from "../../context/hooks";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getUser, User} from "../../api/user";
import UserDetail from "../../components/UserDetail";

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
            } else setUserInfo(null);
        }

        getResponse();
    }, [user, jwtTokens]);

    return userInfo ? <UserDetail key={user!.id} user={userInfo}/> : <></>;
}

export default UserPage;