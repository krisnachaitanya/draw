import express, {Express} from 'express';
import cors from 'cors';
import usersRouter from './routes/user.router';

const app: Express = express();
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/", usersRouter)

export default app;