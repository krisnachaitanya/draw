import { Request, Response } from "express";
import { CreateRoomSchema } from "@repo/common/types";

export const createRoom = (req: Request,res: Response)=>{
    const data = CreateRoomSchema.safeParse(req.body);
    if(!data.success){
        res.status(400).json({
            "message": "Invalid data"
        });
        return;
    }
    res.json({roomId: "123"});
}