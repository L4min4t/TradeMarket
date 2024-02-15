const BASE_URL = process.env.REACT_APP_BASE_URL || "";

const USER_URL = (id: string): string => {
    return `${BASE_URL}/User/${id}`;
};

export {USER_URL};