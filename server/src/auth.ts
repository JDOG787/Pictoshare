import { sign } from "jsonwebtoken";
import { IUser } from "./mongodb/models/User";

export const createAccessToken = (user: IUser) => {
    return sign({ username: user.username, userId:user._id }, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: "15m"
    })
}

export const createRefreshToken = (user: IUser) => {
    return sign({ username: user.username, userId:user._id, tokenVersion: user.tokenVersion }, process.env.REFRESH_TOKEN_SECRET!, {
        expiresIn: "7d"
    })
}