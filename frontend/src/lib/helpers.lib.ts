export function token(action: "get" | "set" | "clear", value?: string): string | void {
    switch (action) {
        case "get":
            return localStorage.getItem("token") || "";
        case "set":
            if (value) {
                localStorage.setItem("token", value);
            }
            break;
        case "clear":
            localStorage.removeItem("token");
            break;
        default:
            break;
    }
}