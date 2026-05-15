import { Router } from "express";
import { getUsersController, updateUserStatusController } from "../controllers";
import { authMiddleware } from "../middlewares";

const userRoutes = Router();

userRoutes.use(authMiddleware);

userRoutes.post("/users", getUsersController);
userRoutes.patch("/user/:id/status", updateUserStatusController);

export default userRoutes;
