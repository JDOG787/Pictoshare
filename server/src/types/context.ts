import { Response } from 'express';
import { AuthRequest } from './request'

export interface Context {
    req: AuthRequest,
    res: Response
}