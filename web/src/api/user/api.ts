import {processResponse, protectedFetch} from "../common";
import {User, UserUpdateDto} from "./interfaces";
import {GET_USERBY_ID_URL, UPDATE_USER_URL} from "./urls";

export const getUser = async (token: string, id: string): Promise<User | null> => {
    const response = await protectedFetch<User>(`${GET_USERBY_ID_URL(id)}`, token, {
        method: "get"
    });
    
    return processResponse(response);
}

export const updateUser = async (token: string, user: UserUpdateDto): Promise<string | null> => {
    const response = await protectedFetch<string>(UPDATE_USER_URL, token, {
        data: user,
        method: "put"
    });

    return processResponse(response);
}