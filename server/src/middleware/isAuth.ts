import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types/request';
import User from '../mongodb/models/User';

export const isAuth = (req: AuthRequest, res: Response, next: NextFunction)  => {
    if (req.session.userId) {
        const foundUser = User.findById(req.session.userId);

        if (foundUser === null) return req.isAuth = false;

        req.isAuth = true;
        req.user = {
            userId: req.session.userId,
            username: req.session.username!
        }
    } else {
        req.isAuth = false;
    }

    next();
}