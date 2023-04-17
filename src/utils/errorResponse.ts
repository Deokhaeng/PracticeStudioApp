import { AxiosError } from 'axios';

export const errorResponse = (error: AxiosError) => {
    const errorStatus = error.response?.status;
    const errorRes = error.response?.data as { message: Object };
    const message = Object.entries(errorRes!)
        .map(([key, val], idx) => `${key}:${val}`)
        .join('&');

    return { message, errorStatus };
};
