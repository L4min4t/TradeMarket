import {processResponse, protectedFetch} from "../common";
import {City} from "./interfaces";
import {CITIES_URL} from "./urls";

export const getCities = async (token: string): Promise<City[] | null> => {
    const response = await protectedFetch<City[]>(CITIES_URL, token, {
        method: "get"
    });
    return processResponse(response);
}