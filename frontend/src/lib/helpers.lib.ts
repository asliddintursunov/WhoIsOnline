export function token(action: "get" | "set" | "clear", value?: string): string | void {
    switch (action) {
        case "get":
            return localStorage.getItem("token") || "";
        case "set":
            localStorage.setItem("token", JSON.stringify(value));
            break;
        case "clear":
            localStorage.removeItem("token");
            break;
        default:
            break;
    }
}