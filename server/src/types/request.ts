import { Request } from 'express';
import { Payload } from './payload'

export interface AuthRequest extends Request {
    isAuth?: boolean,
    payload?: Payload
}