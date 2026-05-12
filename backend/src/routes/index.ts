import authRoute from "./auth.route";
import userRoute from "./user.route";

import { Router } from "express";
const routes = Router();

routes.use("/auth", authRoute);
routes.use("/user", userRoute);

export default routes;