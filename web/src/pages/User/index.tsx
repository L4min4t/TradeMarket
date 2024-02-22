import useAuthContext from "../../context/hooks";
import {useEffect, useState} from "react";
import {getUser, User} from "../../api/user";
import UserDetail from "../../components/User/UserDetail";

const UserPage = () => {
    const {user} = useAuthContext();
    const {jwtTokens} = useAuthContext();
    const [userInfo, setUserInfo] = useState<User | null>(null);

    useEffect(() => {
        async function getResponse() {
            if (user) {
                const result = await getUser(jwtTokens!.accessToken, user!.id);
                if (result) setUserInfo(result as User);
            } else setUserInfo(null);
        }

        getResponse();
    }, [user, jwtTokens]);

    return userInfo ? <UserDetail key={user!.id} userObj={userInfo}/> : <></>;
}

export default UserPage;