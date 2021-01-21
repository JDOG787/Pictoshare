import {Session} from 'express-session'

export default interface AuthSession extends Session {
    userId?: string
}