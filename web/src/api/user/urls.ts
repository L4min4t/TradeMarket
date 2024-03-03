const BASE_URL = process.env.REACT_APP_BASE_URL || "";

const GET_USERBY_ID_URL = (id: string): string => `${BASE_URL}/User/${id}`;

const UPDATE_USER_URL = `${BASE_URL}/User`;

export {GET_USERBY_ID_URL, UPDATE_USER_URL};