import { defaultFetch, protectedFetch } from "../common/http";
import {processResponse} from "../common";

import { PosterPreviewDto } from "./interfaces";

import { POSTERS_URL } from "./urls";

export const getPosters = async (token: string): Promise<PosterPreviewDto[] | null | boolean> => {
    const response = await protectedFetch<PosterPreviewDto[]>(POSTERS_URL, token, {
        method: "get"
    });
    return processResponse(response);
};