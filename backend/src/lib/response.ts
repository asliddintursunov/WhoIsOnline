import type { Response } from "express";

export type ApiResponse = {
    code: number;
    message: string;
    data?: unknown;
    success: boolean;
};

export const successRequest: ApiResponse = {
    code: 200,
    success: true,
    message: "Success",
    data: [],
};

export const createRequestSuccess: ApiResponse = {
    code: 201,
    success: true,
    message: "Created",
    data: [],
};

export const getRequestSuccess: ApiResponse = {
    code: 200,
    success: true,
    message: "GET",
    data: [],
};

export const badRequestError: ApiResponse = {
    code: 400,
    success: false,
    message: "Bad Request",
    data: [],
};

export const notFoundError: ApiResponse = {
    code: 404,
    success: false,
    message: "Not Found",
    data: [],
};

export const internalServerError: ApiResponse = {
    code: 500,
    success: false,
    message: "Internal Server Error",
    data: [],
};

export const unauthorizedError: ApiResponse = {
    code: 401,
    success: false,
    message: "Unauthorized",
    data: [],
};

export const sendResponse = (res: Response, val: ApiResponse) => {
    return res.status(val.code).json({
        success: val.success,
        message: val.message,
        code: val.code,
        data: val.data,
    });
};