const BASE_URL = process.env.REACT_APP_BASE_URL || "";

const POSTERS_URL = `${BASE_URL}/Poster/published`;
const POSTER_BY_ID_URL = (id: string): string => {
    return `${BASE_URL}/Poster/${id}`;
};

export {POSTERS_URL, POSTER_BY_ID_URL};