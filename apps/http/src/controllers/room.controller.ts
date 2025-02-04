import { Request, Response } from "express";
import { CreateRoomSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";

export const createRoom = async (req: Request, res: Response) => {
  const parsedData = CreateRoomSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).json({
      message: "Invalid data",
    });
    return;
  }
  const userId = req.userId;
  if (!userId) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  try {
    const room = await prismaClient.room.create({
      data: {
        slug: parsedData.data.slug,
        adminId: userId
      },
    });
    res.json({ roomId: room.slug });
    return;
  } catch (err) {
    res.status(411).json({
      message: "Room already exists with this id",
    });
  }
};
