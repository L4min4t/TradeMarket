import { defaultFetch, protectedFetch } from "../common/http";
import {processResponse} from "../common";

import { GET_IMAGE_URL } from "./urls";
import {AxiosRequestConfig} from "axios";

export const getImage = async ( id: string, token: string ) => {
    const config: AxiosRequestConfig = {
        responseType: 'blob',
    };

    try {
        const response = await protectedFetch<Blob>(`${GET_IMAGE_URL(id)}`, token);
        if (response.data) {
            return response.data;
        } else {
            throw new Error('Failed to fetch image: No data received.');
        }
    } catch (error) {
        console.error('Error fetching image:', error);
    }
}