import { Router } from "express";
import { onlineUsers } from "../controllers";
import { authMiddleware } from "../middlewares";

const sseRoutes = Router();

sseRoutes.use(authMiddleware);

sseRoutes.get("/online-users", onlineUsers);

export default sseRoutes;
