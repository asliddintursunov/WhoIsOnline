import { Response } from "express";
const ONLINE_USERS = new Map<string, Set<Response>>();

const getClientsIdList = (): string[] => Array.from(ONLINE_USERS.keys())

const broadcast = (clientsIdList: string[]) => {
    const data = `data: ${JSON.stringify(clientsIdList)}\n\n`
    for (const [, connections] of ONLINE_USERS) {
        for (const res of connections) {
            res.write(data);
        }
    }
}

export const addClient = (userId: string, res: Response) => {
    const isNewUser = !ONLINE_USERS.has(userId);
    if (isNewUser) ONLINE_USERS.set(userId, new Set());

    ONLINE_USERS.get(userId)!.add(res);

    if (isNewUser) broadcast(getClientsIdList());
}

export const removeClient = (userId: string, res: Response) => {
    const userConnections = ONLINE_USERS.get(userId);

    if (!userConnections) return;

    userConnections.delete(res);

    if (userConnections.size === 0) {
        ONLINE_USERS.delete(userId);
    }

    broadcast(getClientsIdList())
}