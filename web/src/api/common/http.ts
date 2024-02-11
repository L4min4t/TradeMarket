import axios, {AxiosRequestConfig} from "axios";
import {ApiResponse, ProblemDetails} from "./interfaces";

export const defaultFetch = async <T>(
    url: string,
    config: AxiosRequestConfig = {}
): Promise<ApiResponse<T>> => {
    const defaultConfig: AxiosRequestConfig = {
        headers: {
            "Content-Type": "application/json",
        },
        ...config,
    };

    try {
        const response = await axios(url, defaultConfig);
        return {data: response.data, status: response.status};
    } catch (error: any) {
        let problemDetails: ProblemDetails = {status: 0};

        if (axios.isAxiosError(error) && error.response) {
            problemDetails = {
                ...error.response.data,
                status: error.response.status
            };
        } else {
            problemDetails = {
                title: "Unknown Error",
                status: problemDetails.status,
                errors: [
                    {
                        code: "UnknownError",
                        description: "An unknown error occurred",
                    },
                ],
            };
        }

        return {problemDetails, status: problemDetails.status};
    }
};

export const protectedFetch = async <T>(
    url: string,
    token: string,
    config: AxiosRequestConfig = {}
): Promise<ApiResponse<T>> => {
    const authConfig: AxiosRequestConfig = {
        ...config,
        headers: {
            ...config.headers,
            Authorization: `Bearer ${token}`,
        },
    };
    return defaultFetch<T>(url, authConfig);
};
