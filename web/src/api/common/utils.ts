import {toast} from "react-toastify";
import {ApiResponse} from "./interfaces";

export const processResponse = <T>(
    response: ApiResponse<T>
): T | null => {
    console.log(response);

    // Handle successful response with data
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

        if ("problemDetails" in response && response.problemDetails !== undefined) {
            console.log(response.problemDetails.errors);
            const error = response.problemDetails.errors?.at(0);
            console.log("asdkfjhasldjkfhasdf");
            const message = error
                ? `${error.code}: ${error.description}`
                : errorMessage;

            toast.error(message);
        } else {
            // Handle unknown errors
            toast.error(errorMessage);
        }

        return null;
    }
};
