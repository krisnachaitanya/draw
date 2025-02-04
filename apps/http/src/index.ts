import express, { Express } from "express";
import cors from "cors";
import usersRouter from "./routes/user.router";
import roomRouter from "./routes/room.router";

const app: Express = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", usersRouter);
app.use("/room", roomRouter);

export { app };
