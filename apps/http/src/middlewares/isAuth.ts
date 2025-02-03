import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "@repo/config/config";
import { JwtPayload, verify } from "jsonwebtoken";

const isAuth = (req: Request,res: Response,next: NextFunction) => {
    const token = req.headers["authorization"] ?? "";
    const decoded = verify(token,JWT_SECRET) as JwtPayload;
    if(!token){
        res.json({message: "Uauthorized"});
    }
    req.userId = decoded.userId;
    next();
};

export default isAuth;