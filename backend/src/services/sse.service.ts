import { Response, Request } from "express";
import { getBearerToken } from "../middlewares"
import { verifyToken } from "../lib/jwt";
import { internalServerError, sendResponse, unauthorizedError } from "../lib/response";
import { updateConnection } from "../repositories/sse.repository";

export const addOnlineUser = async (req: Request, res: Response) => {
    const token = getBearerToken(req.headers.authorization);
    if (!token) return sendResponse(res, unauthorizedError);

    const user = verifyToken(token);
    if (!user) return sendResponse(res, unauthorizedError);

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    try {
        await updateConnection(user.id, res, "connect");
        req.on('close', () => {
            void updateConnection(user.id, res, "disconnect").catch((error) => {
                console.error("Failed to handle SSE disconnect", error);
            });
        });
    }
    catch (error: any) {
        sendResponse(res, internalServerError)
    }
};
