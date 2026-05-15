import jwt from "jsonwebtoken";
import { createUser, findUserByUsername } from "../repositories";
import { badRequestError, createRequestSuccess, internalServerError, notFoundError, sendResponse } from "../lib/response";
import { Response } from "express";
import { checkPasswordMatch, passwordHasher } from "../lib/helpers";

const JWT_SECRET_KEY = "bbae8f5570d77b6c1870aa647f2cae8c"
const JWT_EXPIRES_IN = "72h"

const generateToken = (payload: Record<string, string>) => {
    const token = jwt.sign(payload, JWT_SECRET_KEY, {
        expiresIn: JWT_EXPIRES_IN,
    });
    return token;
};


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
        sendResponse(res, {
            ...badRequestError,
            message: "Incorrect username or password! Please try again!"
        })
    }

    const { password: userPassword, ...userData } = user
    const token = generateToken({ id: userData.id, username: userData.username })
    return sendResponse(res, {
        ...createRequestSuccess,
        message: "User logged in successfully!",
        data: { token }
    })
}
