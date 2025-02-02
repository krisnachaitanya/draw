import { Router, IRouter } from "express";
import { createRoom } from "../controllers/room.controller";

const roomRouter: IRouter = Router();

roomRouter.post("/create", createRoom);

export default roomRouter;
