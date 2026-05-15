import { NextFunction, Request, Response } from "express";
import { TokenExpiredError } from "jsonwebtoken";
import { unauthorizedError, sendResponse } from "../lib/response";
import { verifyToken } from "../lib/jwt";

const getBearerToken = (authorizationHeader?: string): string | null => {
    const [scheme, token, ...extraParts] = authorizationHeader?.trim().split(/\s+/) ?? [];

    if (scheme?.toLowerCase() !== "bearer" || !token || extraParts.length > 0) {
        return null;
    }

    return token;
};

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const token = getBearerToken(req.headers.authorization);

    if (!token) {
        sendResponse(res, {
            ...unauthorizedError,
            message: "Authorization bearer token is required",
        });
        return;
    }

    try {
        req.user = verifyToken(token);
        next();
    } catch (error) {
        sendResponse(res, {
            ...unauthorizedError,
            message: error instanceof TokenExpiredError
                ? "Authorization token has expired"
                : "Invalid authorization token",
        });
    }
};
