import { sign } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/config/config";
import { Request, Response } from "express";
import { CreateUserSchema, SignInSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";

export const registerUser = async (req: Request, res: Response) => {
  const userData = CreateUserSchema.safeParse(req.body);
  if (!userData.success) {
    res.status(400).json({
      message: "Invalid data",
    });
    return;
  }
  const user = await prismaClient.user.create({
    data: {
      email: userData.data.email,
      password: userData.data.password,
      name: userData.data.name,
    },
  });

  const token = sign({  }, JWT_SECRET || "");
  res.json({ token });
};
export const signinUser = (req: Request, res: Response) => {
  const data = SignInSchema.safeParse(req.body);
  if (!data.success) {
    res.status(400).json({
      message: "Invalid data",
    });
    return;
  }
  const userId = 1;
  const token = sign({ userId }, JWT_SECRET || "");
  res.json({ token });
};
