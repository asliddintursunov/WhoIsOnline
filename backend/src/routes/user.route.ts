import { Router } from "express";
import { getAll, updateStatus } from "../controllers/user.controller";
const route = Router();

route.post("/users", getAll);
route.post("/user/:id/status", updateStatus);

export default route;