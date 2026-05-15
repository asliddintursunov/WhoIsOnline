import { Router } from "express";
import { getUsersController, updateUserStatusController } from "../controllers";

const userRoutes = Router();

userRoutes.post("/users", getUsersController);
userRoutes.patch("/user/:id/status", updateUserStatusController);

export default userRoutes;
