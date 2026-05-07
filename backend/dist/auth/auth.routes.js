"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRouter = (0, express_1.Router)();
authRouter.post("/login", async (req, res) => {
    const { username, password } = req.body ?? {};
    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }
    return { username, password };
    // try {
    //     const user = await getUserByUsername(username);
    //     if (!user || user.password !== password) {
    //         return res.status(401).json({ error: "Invalid username or password" });
    //     }
    //     res.json(user);
    // } catch (error) {
    //     console.error("Error logging in:", error);
    //     res.status(500).json({ error: "Failed to log in" });
    // }
});
exports.default = authRouter;
