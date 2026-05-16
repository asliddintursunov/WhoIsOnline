import { Request, Response } from "express"
import { getAllUsers, updateUserLastOnline } from "../repositories"
import { User } from "../../generated/prisma/client"
import { verifyToken } from "../lib/jwt"
import { getBearerToken } from "../middlewares"
import { sendResponse, unauthorizedError } from "../lib/response"

export const getUsersService = async (): Promise<Omit<User, "password">[]> => getAllUsers()

export const updateUserLastOnlineService = async (req: Request, res: Response) => {
    const token = getBearerToken(req.headers.authorization);
    if (!token) return sendResponse(res, unauthorizedError);

    const user = verifyToken(token);
    if (!user) return sendResponse(res, unauthorizedError);

    return await updateUserLastOnline(user.id, {
        lastOnline: new Date(),
    })
}
