import { sign } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/config/config";
import { Request, Response } from "express";
import { CreateUserSchema, SignInSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
import { compare, hash } from "bcryptjs";

export const registerUser = async (req: Request, res: Response) => {
  const userData = CreateUserSchema.safeParse(req.body);
  if (!userData.success) {
    res.status(400).json({
      message: "Invalid data",
    });
    return;
  }
  try {
    const hashedPassword = await hash(userData.data.password, 10);
    const user = await prismaClient.user.create({
      data: {
        email: userData.data.email,
        password: hashedPassword,
        name: userData.data.name,
      },
    });

    const token = sign({ id: user.id }, JWT_SECRET);
    res.cookie("token", token);
    res.json({ token });
    return;
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: "Invalid credentials",
    });
    return;
  }
};
export const signinUser = async (req: Request, res: Response) => {
  const parsedData = SignInSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).json({
      message: "Invalid data",
    });
    return;
  }
  const user = await prismaClient.user.findFirst({
    where: {
      email: parsedData.data.email,
    },
  });

  if (!user) {
    res.status(401).json({
      message: "Invalid credentials",
    });
    return;
  }
  const valid = await compare(user.password, parsedData.data.password);
  if (!valid) {
    res.json({
      message: "Invalid credentials",
    });
    return;
  }
  const token = sign({ id: user.id }, JWT_SECRET);
  res.cookie("token", token);
  res.json({ token });
  return;
};
