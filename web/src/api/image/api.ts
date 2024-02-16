import {protectedFetch} from "../common";
import {DELETE_IMAGE_URL, UPLOAD_IMAGE_URL} from "./urls";

export const uploadImage = async (token: string, id: string, file: File): Promise<void> => {
    const formData = new FormData();
    formData.append('ImageFile', file);
    formData.append('Id', id);

    await protectedFetch(UPLOAD_IMAGE_URL, token, {
        data: formData,
        method: "post"
    });
};

export const deleteImage = async (token: string, id: string): Promise<void> => {
    await protectedFetch(`${DELETE_IMAGE_URL(id)}`, token, {
        method: "delete"
    });
};