import { createUser, findUserByUsername } from "../repositories";
import { badRequestError, createRequestSuccess, internalServerError, notFoundError, sendResponse, successRequest } from "../lib/response";
import { Response } from "express";
import { checkPasswordMatch, passwordHasher } from "../lib/helpers";
import { generateToken } from "../lib/jwt";


export const registerUser = async (res: Response, username: string, password: string) => {
    const user = await findUserByUsername(username)
    if (user) {
        return sendResponse(res, {
            ...notFoundError,
            message: "User with this username already exists! Please try another username!"
        })
    }

    try {
        const hashedPswrd = await passwordHasher(password)
        const newUser = await createUser(username, hashedPswrd)
        return sendResponse(res, {
            ...createRequestSuccess,
            message: `User with ${newUser?.username} has been created successfully!`
        })
    } catch (error: any) {
        return sendResponse(res, {
            ...internalServerError,
            message: error.message
        })
    }
}

export const loginUser = async (res: Response, username: string, password: string) => {
    const user = await findUserByUsername(username)
    if (!user) {
        return sendResponse(res, {
            ...notFoundError,
            message: "User with this username not found! Please try again!"
        })
    }

    const doesPasswordMatch = await checkPasswordMatch(password, user.password)

    if (!doesPasswordMatch) {
        return sendResponse(res, {
            ...badRequestError,
            message: "Incorrect username or password! Please try again!"
        })
    }

    const token = generateToken({ id: user.id, username: user.username })
    return sendResponse(res, {
        ...successRequest,
        message: "User logged in successfully!",
        data: { token }
    })
}
