import { Router, IRouter } from "express";
import { registerUser, signinUser } from "../controllers/user.controller";
const usersRouter: IRouter = Router();

usersRouter.post("/signup", registerUser);
usersRouter.post("/signup", signinUser);

export default usersRouter;
