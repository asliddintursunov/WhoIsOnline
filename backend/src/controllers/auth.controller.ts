import { Request, Response } from "express"
import { sendResponse } from "../lib/response"
import { loginUser as loginUserService, registerUser as registerUserService } from "../services"
import { loginSchema, registerSchema } from "../schemas/authSchemas"
import { getFirstError } from "../lib/helpers"

export const registerController = async (req: Request, res: Response) => {
    const { success, data, error } = registerSchema.safeParse(req.body)

    if (!success) {
        const errorMessage = getFirstError(error)
        return sendResponse(res, {
            code: 400,
            message: errorMessage
        })
    }

    return registerUserService(res, data.username, data.password)
}

export const loginController = async (req: Request, res: Response) => {
    const { success, data, error } = loginSchema.safeParse(req.body)

    if (!success) {
        const errorMessage = getFirstError(error)
        return sendResponse(res, {
            code: 400,
            message: errorMessage
        })
    }

    return loginUserService(res, data.username, data.password)
}
