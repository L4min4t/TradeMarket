import React, {useEffect, useState} from "react";
import {getUser, User} from "../../../api/user";
import useAuthContext from "../../../context/hooks";
import {toast} from "react-toastify";
import {Avatar, City, ColumnContainer, Contact, ContactContainer, Name, ShortUserInfoContainer} from "./styles";
import CustomIcon from "../../CustomIcon";

interface ShortUserInfoProps {
    id: string;
}

const ShortUserInfo = ({id}: ShortUserInfoProps) => {
    const [user, setUser] = useState<User>();
    const {jwtTokens} = useAuthContext();

    useEffect(() => {
        async function getResponse() {
            const result = await getUser(jwtTokens!.accessToken, id);
            if (result) setUser(result as User);
            else toast.error("Failed loading user information!");
        }

        getResponse();

    }, [id]);
    return user ? (
            <ShortUserInfoContainer>
                <Avatar src={
                    `${process.env.REACT_APP_BASE_URL}/Images/${user.avatarId || "user"}.jpg`
                }/>

                <ColumnContainer>

                </ColumnContainer>

                <ColumnContainer>
                    <Name>{user.name}</Name>
                    <City>
                        <CustomIcon src={"spot.png"} width="18px"/> {user.city.name}, {user.city.region}
                    </City>
                    {user.phone && <ContactContainer>
                        <CustomIcon src={"phone.png"} height="22px"/>
                        <Contact href={`tel:${user.phone}`}>{user.phone}</Contact>
                    </ContactContainer>
                    }
                    {user.telegram && <ContactContainer>
                        <CustomIcon src={"telegram.png"} height="22px"/>
                        <Contact href={`https://t.me/${user.telegram}`}>{user.telegram}</Contact>
                    </ContactContainer>
                    }
                    {user.email && <ContactContainer>
                        <CustomIcon src={"email.png"} height="22px"/>
                        <Contact href={`mailto: ${user.email}`}>{user.email}</Contact>
                    </ContactContainer>
                    }
                </ColumnContainer>
            </ShortUserInfoContainer>
        )
        : <></>;
}

export default ShortUserInfo;