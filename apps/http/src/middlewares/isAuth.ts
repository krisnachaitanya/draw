import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "@repo/config/config";
import { JwtPayload, verify } from "jsonwebtoken";

const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies;
  if (!token) {
    res.json({ message: "Uauthorized" });
  }
  const decoded = verify(token, JWT_SECRET) as JwtPayload;
  req.userId = decoded.id;
  next();
};

export default isAuth;
