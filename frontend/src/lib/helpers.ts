export const setUserData = (data: object) => {
    localStorage.setItem("user_data", JSON.stringify(data));
};

export const getUserData = (): Record<string, unknown> | null => {
    const raw = localStorage.getItem("user_data");
    if (!raw) return null;
    try {
        return JSON.parse(raw) as Record<string, unknown>;
    } catch {
        return null;
    }
};

export const clearUserData = () => {
    localStorage.removeItem("user_data");
};