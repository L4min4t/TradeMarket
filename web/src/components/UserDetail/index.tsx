import {User} from "../../api/user";
import CustomIcon from "../CustomIcon";
import {Container, LogOutButton} from "./styles";
import useAuthContext from "../../context/hooks";
import LikedPosters from "../LikedPosters";

interface UserDetailProps {
    user: User;
}

const UserDetail = (props: UserDetailProps) => {
    const {logoutUser} = useAuthContext();

    return (
        <Container>
            <LogOutButton onClick={logoutUser}>
                <CustomIcon src={"logout.png"} width="50px"/>
            </LogOutButton>
            <p>{props.user.name}</p>
            <p>{props.user.avatarId}</p>
            <p>{props.user.email}</p>
            <p>{props.user.phone}</p>
            <p>{props.user.telegram}</p>
            <p>{props.user.city?.name}</p>
            <LikedPosters/>

        </Container>
    );
}

export default UserDetail;