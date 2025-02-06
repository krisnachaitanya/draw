import { Router, IRouter } from "express";
import { createRoom, getMessages } from "../controllers/room.controller";
import isAuth from "../middlewares/isAuth";

const roomRouter: IRouter = Router();

roomRouter.use("*", isAuth);

roomRouter.post("/create", createRoom);
roomRouter.get("/:roomId", getMessages);

export default roomRouter;
