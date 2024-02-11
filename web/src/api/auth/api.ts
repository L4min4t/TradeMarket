import {LOGIN_URL, REFRESH_URL, REGISTER_URL} from "./urls";

import {Jwts} from "./interfaces";

import {defaultFetch, processResponse, protectedFetch} from "../common";

export const login = async (
    email: string,
    password: string
): Promise<Jwts | null | boolean> => {
    const response = await defaultFetch<Jwts>(LOGIN_URL, {
        method: "post",
        data: {email, password},
    });

    return processResponse(response);
};

export const register = async (
    email: string,
    name: string,
    password: string
): Promise<void | null | boolean> => {
    const response = await defaultFetch<void>(REGISTER_URL, {
        method: "post",
        data: {email, name, password},
    });

    return processResponse(response);
};

export const refreshToken = async (
    email: string,
    tokens: Jwts
): Promise<Jwts | null | boolean> => {
    const response = await protectedFetch<Jwts>(
        REFRESH_URL,
        tokens.accessToken,
        {
            method: "post",
            data: {
                email,
                ...tokens,
            },
        }
    );

    return processResponse(response);
};