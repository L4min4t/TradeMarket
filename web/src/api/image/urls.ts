const BASE_URL = process.env.REACT_APP_BASE_URL || "";

const UPLOAD_IMAGE_URL = `${BASE_URL}/Image`;
const DELETE_IMAGE_URL = (id: string) => `${BASE_URL}/Image/${id}`;

export {UPLOAD_IMAGE_URL, DELETE_IMAGE_URL};