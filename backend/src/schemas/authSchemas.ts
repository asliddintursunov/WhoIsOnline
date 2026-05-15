import { z } from 'zod';

export const registerSchema = z.object({
    username: z.string({ error: "Username is missing" }).min(4, { error: "Username must be at least 4 characters" }),
    password: z.string({ error: "Username is missing" }).min(8, { error: "Password must be at least 8 characters" }),
});

export const loginSchema = z.object({
    username: z.string({ error: "Username is missing" }).min(4, { error: "Username must be at least 4 characters" }),
    password: z.string({ error: "Username is missing" }).min(8, { error: "Password must be at least 8 characters" }),
});
