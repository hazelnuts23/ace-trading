import jwt, {JwtPayload} from "jsonwebtoken";
import {NextFunction, Request, Response} from "express";
import config from "../../config/app"

export interface CustomRequest extends Request {
    token: string | JwtPayload;
}


/**
 * Verifying token
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
export const verifyToken = (req: Request, res: Response, next: NextFunction): any => {
    if (!req.header("Authorization")) return res.status(401).json({
        message: "Unauthorized"
    });
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new Error();
        }
        (req as CustomRequest).token = jwt.verify(token, config.jwt.secret);
        next();
    } catch (err) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
};

