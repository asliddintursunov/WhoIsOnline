import { User } from "../../generated/prisma/client"
import { prisma } from "../lib/prisma"

export const createUser = async (username: string, password: string): Promise<User | null> => {
    const user = await prisma.user.create({
        data: {
            username,
            password,
        }
    })

    return user
}
