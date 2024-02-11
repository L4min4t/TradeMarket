export interface ProblemDetails {
    type?: string;
    title?: string;
    status: number;
    errors?: Array<{
        code: string;
        description: string;
    }>;
}

export type ApiResponse<T> =
    | { data: T; status: number; problemDetails?: never }
    | { data?: never; status: number; problemDetails: ProblemDetails };
