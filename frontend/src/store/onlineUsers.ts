import { useState, useEffect } from "react";

type OnlineUsersStore = {
    users: string[];
    subscribers: Set<(users: string[]) => void>;
};

const store: OnlineUsersStore = {
    users: [],
    subscribers: new Set(),
};

export function updateOnlineUsers(users: string[]) {
    store.users = users;
    store.subscribers.forEach((callback) => callback(users));
}

export function subscribeToOnlineUsers(
    callback: (users: string[]) => void
): () => void {
    store.subscribers.add(callback);
    return () => {
        store.subscribers.delete(callback);
    };
}

export function useOnlineUsers() {
    const [users, setUsers] = useState<string[]>(store.users);

    useEffect(() => {
        const unsubscribe = subscribeToOnlineUsers((newUsers) => {
            setUsers(newUsers);
        });
        return unsubscribe;
    }, []);

    return users;
}

export function getOnlineUsers() {
    return store.users;
}
