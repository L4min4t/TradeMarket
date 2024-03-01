import {processResponse, protectedFetch} from "../common";
import {DELETE_IMAGE_URL, UPLOAD_IMAGE_URL} from "./urls";

export const uploadImage = async (token: string, id: string, file: File): Promise<boolean | null> => {
    const formData = new FormData();
    formData.append('ImageFile', file);
    formData.append('Id', id);

    const result = await protectedFetch<boolean | null>(UPLOAD_IMAGE_URL, token, {
        data: formData,
        method: "post"
    });
    return processResponse(result);
};

export const deleteImage = async (token: string, id: string): Promise<void> => {
    await protectedFetch(`${DELETE_IMAGE_URL(id)}`, token, {
        method: "delete"
    });
};