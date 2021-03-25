import { verify } from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types/request';
import { Payload } from '../types/payload';

export const isAuth = (req: AuthRequest, res: Response, next: NextFunction)  => {
    const authorization = req.headers.authorization;

    if (!authorization) {
        req.isAuth = false
        return next();
    }

    let payload = null;
    try {
        const token = authorization.split(" ")[1];
        payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);

        req.isAuth = true;
        req.payload = payload as Payload;
    } catch(err) {
        req.isAuth = false;
        console.log(err)
    }

    next();
}