// import { API_ENDPIINTS, BASE_URL } from "../constants";

// let eventSource: EventSource | null = null;

// export function connectEvent() {
//     if (eventSource) return eventSource;

//     eventSource = new EventSource(`${BASE_URL}${API_ENDPIINTS.EVENTS.ONLINE_USERS}`);

//     eventSource.onopen = () => {
//         console.log("Connected");
//     };

//     eventSource.onmessage = (event: MessageEvent) => {
//         const data = JSON.parse(event.data);
//         console.log(data);
//     };

//     eventSource.close = () => {
//         console.log("Disconnected");
//         eventSource = null;
//     };

//     return eventSource;
// }

// export function getEventSource() {
//     return eventSource;
// }

// export function disconnectEventSource() {
//     eventSource?.close()
//     eventSource = null;
// }

let controller: AbortController | null = null;

export async function connectEvent() {
    controller = new AbortController();


}