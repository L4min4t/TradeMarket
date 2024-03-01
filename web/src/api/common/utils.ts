﻿import {toast} from "react-toastify";
import {ApiResponse} from "./interfaces";

export const processResponse = <T>(
    response: ApiResponse<T>
): T | boolean | null => {
    if (response.status === 200 && "data" in response)
        if (response.data !== undefined ) return response.data 
        else return true;
    else {
        if ('error' in response) {
            if (typeof response.error === 'object' && 'errors' in response.error) {
                const message = response.error.errors.Title.map((err: string) => err);
                toast.error(`${message}`);
            } else toast.error(`${response.error}`);
        } else {
            toast.error(`Unknown error.`);
        }

        return null;
    }
};
