import type { Response } from "express";

export type ApiResponse = {
    code: number;
    message: string;
    data?: unknown;
};

export const successRequest: ApiResponse = {
    code: 200,
    message: "Success",
    data: [],
};

export const createRequestSuccess: ApiResponse = {
    code: 201,
    message: "Created",
};

export const getRequestSuccess: ApiResponse = {
    code: 200,
    message: "GET",
};

export const badRequestError: ApiResponse = {
    code: 400,
    message: "Bad Request",
};

export const notFoundError: ApiResponse = {
    code: 404,
    message: "Not Found",
};

export const internalServerError: ApiResponse = {
    code: 500,
    message: "Internal Server Error",
};

export const unauthorizedError: ApiResponse = {
    code: 401,
    message: "Unauthorized",
};

export const sendResponse = (res: Response, val: ApiResponse) => {
    return res.status(val.code).json({
        message: val.message,
        data: val.data,
    });
};