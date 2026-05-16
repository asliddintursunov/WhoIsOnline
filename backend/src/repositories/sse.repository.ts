import { Response } from "express";
import { updateUserLastOnline } from "./user.repository";

type OnlineClientsListType = {
    id: string,
    lastSeenAt: Date | null,
    isOnline: Boolean
}

const ONLINE_USERS = new Map<
    string,
    {
        isOnline: Boolean,
        connections: Set<Response>;
        lastSeenAt: Date | null;
    }
>();

const getOnlineClientsList = (): OnlineClientsListType[] => {
    const data = []
    for (const [id, { lastSeenAt, isOnline }] of ONLINE_USERS) {
        data.push({ id, lastSeenAt, isOnline })
    }
    return data
}

const broadcast = (onlineClientsList: OnlineClientsListType[]) => {
    const data = `data: ${JSON.stringify(onlineClientsList)}\n\n`
    for (const [, { connections }] of ONLINE_USERS) {
        for (const res of connections) {
            res.write(data);
        }
    }
}

export const updateConnection = (userId: string, res: Response, type: "connect" | "disconnect") => {
    switch (type) {
        case "connect":
            connectUser(userId, res)
            break;
        case "disconnect":
            disconnectUser(userId, res)
            break
        default:
            break;
    }
}

const connectUser = (userId: string, res: Response) => {
    let user = ONLINE_USERS.get(userId);
    const wasOffline = !user || !user.isOnline;

    if (!user) {
        user = {
            connections: new Set<Response>(),
            lastSeenAt: null,
            isOnline: true,
        };

        ONLINE_USERS.set(userId, user);
    }

    user.connections.add(res);
    user.isOnline = true;
    user.lastSeenAt = null;

    if (wasOffline) {
        broadcast(getOnlineClientsList());
    }
};

const disconnectUser = async (userId: string, res: Response) => {
    const user = ONLINE_USERS.get(userId);

    if (!user) return;

    user.connections.delete(res);

    if (user.connections.size > 0) {
        return;
    }

    const lastSeenAt = new Date();

    user.isOnline = false;
    user.lastSeenAt = lastSeenAt;

    await updateUserLastOnline(userId, { lastOnline: lastSeenAt });

    broadcast(getOnlineClientsList());
};
