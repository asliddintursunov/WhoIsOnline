import { Response, Request } from "express";
import { getBearerToken } from "../middlewares"
import { verifyToken } from "../lib/jwt";
import { internalServerError, sendResponse, unauthorizedError } from "../lib/response";
import { updateConnection } from "../repositories/sse.repository";
import { updateUserLastOnlineService } from "./user.service";

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
        updateConnection(user.id, res, "connect");
        req.on('close', async () => {
            updateConnection(user.id, res, "disconnect")
            await updateUserLastOnlineService(req, res)
        });
    }
    catch (error: any) {
        sendResponse(res, internalServerError)
    }
};