import { Request, Response } from "express"
import { getUsersService } from "../services"
import { getRequestSuccess, internalServerError, sendResponse } from "../lib/response"

export const getUsersController = async (_req: Request, res: Response) => {
    try {
        const users = await getUsersService()

        return sendResponse(res, {
            ...getRequestSuccess,
            data: users,
        })
    } catch (error: any) {
        return sendResponse(res, {
            ...internalServerError,
            message: error.message,
        })
    }
}
