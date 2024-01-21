
declare namespace Express {
    export interface Request {
        context?: {
            user: any
        }
    }
}