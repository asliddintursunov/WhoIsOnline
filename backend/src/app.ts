import { WebSocket, WebSocketServer } from 'ws';
import express, { type Request, type Response } from "express";
import cors from "cors";
import "./db/db";
import { createServer, IncomingMessage } from 'node:http';
import database from './db/db';
import { changeOnlineStatus, createUser, getAllUsers, getById, getByUsername } from './db/queries';

const app = express();
const server = createServer(app);
const CLIENTS = new Map<WebSocket, { id: string }>();

const PORT = 8000;

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
    res.send("Server is working!");
});

app.post("/login", async (req: Request, res: Response) => {
    const { username, password } = req.body ?? {};

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }
    try {
        const user = database.prepare(getByUsername).get(username);

        if (!user || user.password !== password) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        res.json(user);
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ error: "Failed to log in" });
    }
});

app.post("/register", async (req: Request, res: Response) => {
    const { username, password } = req.body ?? {};

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }
    try {
        const existingUser = database.prepare(getByUsername).get(username);
        if (existingUser) {
            return res.status(409).json({ error: "Username already exists" });
        }
        const result = database.prepare(createUser).run(username, password);
        const newUser = database.prepare(getById).get(result.lastInsertRowid);
        res.json(newUser);
    } catch (error) {
        console.error("Error registering:", error);
        res.status(500).json({ error: "Failed to register" });
    }
});

app.get("/users", async (_req: Request, res: Response) => {
    try {
        const users = database.prepare(getAllUsers).all();
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

const wss = new WebSocketServer({ server })

const broadcastClients = () => {
    const clientIds = Array.from(CLIENTS.values()).map(c => c.id);
    for (const client of CLIENTS.keys()) {
        client.send(JSON.stringify(clientIds));
    }
};

wss.on("connection", (ws: WebSocket, request: IncomingMessage) => {
    try {
        const params = new URLSearchParams(request.url?.split("?")[1])
        const id = params.get("id") ?? ""
        const user = database.prepare(getById).get(id)

        if (!user) {
            ws.send("User with this ID doesn't exist!");
            ws.close();
            return
        }
        CLIENTS.set(ws, { id })
        database.prepare(changeOnlineStatus).run(1, id)
        broadcastClients();

        ws.on("close", () => {
            CLIENTS.delete(ws)
            database.prepare(changeOnlineStatus).run(0, id)
            broadcastClients();
            console.log("Client disconnected");
        });
    } catch (error: any) {
        throw new Error(error.message)
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})