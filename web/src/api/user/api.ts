import {processResponse, protectedFetch} from "../common";
import {User} from "./interfaces";
import {USER_URL} from "./urls";

export const getUser = async (token: string, id: string): Promise<User | null> => {
    const response = await protectedFetch<User>(`${USER_URL(id)}`, token, {
        method: "get"
    });
    return processResponse(response);
}