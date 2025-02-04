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
  try{
    const user = await prismaClient.user.create({
      data: {
        email: userData.data.email,
        password: userData.data.password,
        name: userData.data.name,
      }
    })
  
    const token = sign(user.id, JWT_SECRET || "");
    res.cookie("token",token)
    res.json({ token });
    return
  }catch(err){
    console.log(err)
    res.status(401).json({
      message: "Invalid credentials"
    })
    return
  }
};
export const signinUser = async(req: Request, res: Response) => {
  const data = SignInSchema.safeParse(req.body);
  if (!data.success) {
    res.status(400).json({
      message: "Invalid data",
    });
    return;
  }
  const user = await prismaClient.user.findFirst({
    where: {
      email: data.data.email,
      password: data.data.password,
    }
  });

  if(!user) {
    res.status(401).json({
      message: "Invalid credentials",
    });
    return
  }
  const token = sign(user?.id, JWT_SECRET || "");
  res.cookie("token",token)
  res.json({ token });
};
