import { Router, IRouter } from "express";
import { registerUser, signinUser } from "../controllers/user.controller";
const usersRouter: IRouter = Router();

usersRouter.post("/signup", registerUser);
usersRouter.post("/signin", signinUser);

export default usersRouter;
