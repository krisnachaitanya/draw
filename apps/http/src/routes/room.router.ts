import { Router, IRouter } from "express";
import {
  createRoom,
  getMessages,
  getRoomId,
} from "../controllers/room.controller";
import isAuth from "../middlewares/isAuth";

const roomRouter: IRouter = Router();

roomRouter.post("/create", isAuth, createRoom);
roomRouter.get("/id/:slug", getRoomId);
roomRouter.get("/:roomId", isAuth, getMessages);

export default roomRouter;
