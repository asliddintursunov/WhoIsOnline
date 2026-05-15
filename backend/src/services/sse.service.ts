import { Response, Request } from "express";
import { getBearerToken } from "../middlewares"
import { verifyToken } from "../lib/jwt";
import { sendResponse, unauthorizedError } from "../lib/response";
import { addClient, removeClient } from "../repositories/sse.repository";

export const addOnlineUser = async (req: Request, res: Response) => {
    const token = getBearerToken(req.headers.authorization);
    if (!token) return sendResponse(res, unauthorizedError);

    const user = verifyToken(token);
    if (!user) return sendResponse(res, unauthorizedError);

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    addClient(user.id, res);
    req.on('close', () => removeClient(user.id, res));
};