import { Response } from "express";

const getClientsIdList = (clients: Map<string, Set<Response>>): string[] => Array.from(clients.keys())

const broadcast = (clientsIdList: string[], clients: Map<string, Set<Response>>) => {
    const data = `data: ${JSON.stringify(clientsIdList)}\n\n`
    for (const [, connections] of clients) {
        for (const res of connections) {
            res.write(data);
        }
    }
}

export const addClient = (userId: string, res: Response, clients: Map<string, Set<Response>>) => {
    const isNewUser = !clients.has(userId);
    if (isNewUser) clients.set(userId, new Set());

    clients.get(userId)!.add(res);

    if (isNewUser) broadcast(getClientsIdList(clients), clients);
}

export const removeClient = (userId: string, res: Response, clients: Map<string, Set<Response>>) => {
    const userConnections = clients.get(userId);

    if (!userConnections) return;

    userConnections.delete(res);

    if (userConnections.size === 0) {
        clients.delete(userId);
    }

    broadcast(getClientsIdList(clients), clients)
}