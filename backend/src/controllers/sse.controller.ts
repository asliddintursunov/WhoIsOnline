import { Request, Response } from "express"
import { addOnlineUser } from "../services/sse.service";

export const onlineUsers = async (req: Request, res: Response) => {
    return addOnlineUser(req, res)
}
