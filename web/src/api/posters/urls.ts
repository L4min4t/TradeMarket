const BASE_URL = process.env.REACT_APP_BASE_URL || "";

const POSTERS_URL = `${BASE_URL}/Poster/published`;
const LIKE_POSTER_URL = (id: string): string => {
    return `${BASE_URL}/Poster/like/${id}`;
}
const VIEW_POSTER_URL = (id: string): string => {
    return `${BASE_URL}/Poster/view/${id}`;
};
const POSTER_BY_ID_URL = (id: string): string => {
    return `${BASE_URL}/Poster/${id}`;
};

const LIKED_POSTERS_URL = (id: string): string => {
    return `${BASE_URL}/Poster/liked/${id}`;
};


export {POSTERS_URL, LIKE_POSTER_URL, VIEW_POSTER_URL, POSTER_BY_ID_URL, LIKED_POSTERS_URL};