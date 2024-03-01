import {processResponse, protectedFetch} from "../common";
import {User, UserUpdateDto} from "./interfaces";
import {UPDATE_USER_URL, USER_URL} from "./urls";

export const getUser = async (token: string, id: string): Promise<User | boolean | null> => {
    const response = await protectedFetch<User>(`${USER_URL(id)}`, token, {
        method: "get"
    });
    return processResponse(response);
}

export const updateUser = async (token: string, user: UserUpdateDto): Promise<void> => {
    await protectedFetch(UPDATE_USER_URL, token, {
        data: user,
        method: "put"
    });
}