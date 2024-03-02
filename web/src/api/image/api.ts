import {processResponse, protectedFetch} from "../common";
import {UPLOAD_IMAGE_URL} from "./urls";

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