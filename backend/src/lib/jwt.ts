import jwt, { JsonWebTokenError, type JwtPayload, type SignOptions } from "jsonwebtoken";

export type AuthTokenPayload = {
    id: string;
    username: string;
};

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY ?? "bbae8f5570d77b6c1870aa647f2cae8c";
const JWT_EXPIRES_IN: SignOptions["expiresIn"] = "72h";

const isAuthTokenPayload = (payload: string | JwtPayload): payload is JwtPayload & AuthTokenPayload => {
    return typeof payload !== "string"
        && typeof payload.id === "string"
        && typeof payload.username === "string";
};

export const generateToken = (payload: AuthTokenPayload): string => {
    return jwt.sign(payload, JWT_SECRET_KEY, {
        expiresIn: JWT_EXPIRES_IN,
    });
};

export const verifyToken = (token: string): AuthTokenPayload => {
    const payload = jwt.verify(token, JWT_SECRET_KEY);

    if (!isAuthTokenPayload(payload)) {
        throw new JsonWebTokenError("Invalid token payload");
    }

    return {
        id: payload.id,
        username: payload.username,
    };
};
