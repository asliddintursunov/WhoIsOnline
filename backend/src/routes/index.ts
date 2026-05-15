import { Router } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import sseRoutes from "./sse.routes";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/user", userRoutes);
routes.use("/event", sseRoutes);

export default routes;
