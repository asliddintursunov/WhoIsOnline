import { User } from "../../generated/prisma/client"
import { prisma } from "../lib/prisma"

export const findUserByUsername = async (username: string): Promise<User | null> => {
    const user = await prisma.user.findFirst({
        where: {
            username
        }
    })
    return user
}
export const getAllUsers = () => { }
export const updateUser = () => { }
