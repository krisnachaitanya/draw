import dotenv from "dotenv";
dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET ?? "";
export const HTTP_PORT = process.env.PORT ?? 3001;
export const WS_PORT = process.env.PORT ?? 8080;