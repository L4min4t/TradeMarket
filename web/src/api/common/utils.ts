import {toast} from "react-toastify";
import {ApiResponse} from "./interfaces";

export const processResponse = <T>(
    response: ApiResponse<T>
): T | null => {
    if (response.status === 200 && "data" in response) {
        return response.data !== undefined ? response.data : null;
    } else {
        const errorMessages: { [key: number]: string } = {
            400: "The request was invalid. Please check your input.",
            401: "Unauthorized access. Please log in.",
            403: "Forbidden. You do not have permission to access this resource.",
            404: "The requested resource was not found.",
            409: "Access denied. The resource may be locked or in use."
        };

        const errorMessage = errorMessages[response.status] || "An error occurred.";

        if ("problemDetails" in response && response.problemDetails !== undefined && response.status !== 401) {
            const error = response.problemDetails
                ? response.problemDetails
                : null;
            const message = error
                ? `${error.status}: ` + Object.entries(error)
                .filter(([key, _]) => !isNaN(Number(key)))
                .map(([_, value]) => value)
                .join("")
                : errorMessage;

            toast.error(message);
        } else {
            toast.error(errorMessage);
        }

        return null;
    }
};
