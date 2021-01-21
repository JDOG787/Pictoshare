import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types/request';

export const isAuth = (req: AuthRequest, res: Response, next: NextFunction)  => {
    if (req.session.userId) {
        req.isAuth = true;
    } else {
        req.isAuth = false;
    }

    next();
}