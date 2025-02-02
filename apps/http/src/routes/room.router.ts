import { Router, IRouter } from "express";
import { createRoom } from "../controllers/room.controller";
import isAuth from "../middlewares/isAuth";

const roomRouter: IRouter = Router();

roomRouter.post("/create", isAuth,createRoom);

export default roomRouter;
