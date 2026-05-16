import { Router } from "express";
import { getUsersController } from "../controllers";
import { authMiddleware } from "../middlewares";

const userRoutes = Router();

userRoutes.use(authMiddleware);

userRoutes.post("/users", getUsersController);

export default userRoutes;
