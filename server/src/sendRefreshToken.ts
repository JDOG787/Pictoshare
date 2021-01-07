import { Response } from 'express';

export const sendRefreshToken = (res: Response, token: String) => {
    res.cookie("jid", token, {
        httpOnly: true
    })
}