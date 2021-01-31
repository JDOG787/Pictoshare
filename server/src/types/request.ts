import { Request } from 'express';
import Session  from './session';
import User from './user';

export interface AuthRequest extends Request {
    isAuth?: boolean,
    user?: User 
    session: Session
}