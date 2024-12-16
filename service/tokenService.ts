import jwt from "jsonwebtoken";

export function createAccessToken(email: string, id: string ) {
    return jwt.sign({ email, id }, process.env.JWT_SECRET || "asdajsd", {
        expiresIn: "1d", 
    });
}

export function verifyToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET || "asdajsd");
}


export function createRefreshToken(_id: string) {
    return jwt.sign({ _id }, process.env.JWT_REFRESH_SECRET || "asdajsd", {
        expiresIn: "7d",
    });
}

export function verifyRefreshToken(token: string) {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET || "asdajsd");
}

