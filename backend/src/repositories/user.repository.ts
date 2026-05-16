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
export const getAllUsers = async (): Promise<Omit<User, "password">[]> => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            username: true,
            createdAt: true,
            lastOnline: true
        }
    })
    return users
}
export const updateUserLastOnline = async (id: string, data: Pick<User, "lastOnline">) => {
    await prisma.user.update({ where: { id }, data })
}
