import { WS_URL } from "../constants";
import { updateOnlineUsers } from "../store/onlineUsers";

let socket: WebSocket | null = null;

export function connectSocket(userId: string) {
    if (socket) return socket;

    socket = new WebSocket(`${WS_URL}?id=${userId}`);

    socket.onopen = () => {
        console.log("Connected");
    };

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        updateOnlineUsers(data);
    };

    socket.onclose = () => {
        console.log("Disconnected");
        socket = null;
    };

    return socket;
}

export function getSocket() {
    return socket;
}

export function disconnectSocket() {
    socket?.close();
    socket = null;
}

export function sendMessage(data: any) {
    socket?.send(JSON.stringify(data));
}