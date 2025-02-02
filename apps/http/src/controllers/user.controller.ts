import { sign } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/config";
import { Request, Response } from "express";

export const registerUser = (req: Request, res: Response) => {
  const userId = 1;
  const token = sign({ userId }, JWT_SECRET || "");
  res.json({ token });
};
export const signinUser = (req: Request, res: Response) => {
  const userId = 1;
  const token = sign({ userId }, JWT_SECRET || "");
  res.json({ token });
};
