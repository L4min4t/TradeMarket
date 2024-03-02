import {processResponse, protectedFetch} from "../common";
import {UPLOAD_IMAGE_URL} from "./urls";

export const uploadImage = async (token: string, id: string, file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append('ImageFile', file);
    formData.append('Id', id);

    const result = await protectedFetch<string | null>(UPLOAD_IMAGE_URL, token, {
        data: formData,
        method: "post"
    });
    return processResponse(result);
};