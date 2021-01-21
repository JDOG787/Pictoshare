import { Request } from 'express';
import Session  from './session';

export interface AuthRequest extends Request {
    isAuth?: boolean,
    session: Session
}