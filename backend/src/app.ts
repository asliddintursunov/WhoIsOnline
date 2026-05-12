import express, { Request, Response } from "express";
import routes from "./routes";
import cors from "cors";

export function createApp() {
    const app = express();

    app.use(express.json());
    app.use(cors());
    app.use("/api", routes);

    app.get("/", (req: Request, res: Response) => {
        res.json({ message: "Server is running!" });
    });

    return app;
}
