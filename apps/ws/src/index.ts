import { WebSocketServer } from "ws";
import { JwtPayload, verify } from "jsonwebtoken";
import {JWT_SECRET} from "@repo/config";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws, req) => {
  const url = req.url;
  if (!url) return;
  const params = new URLSearchParams(url.split("?")[1]);
  const token = params.get("token");
  if(!token) {
    ws.close();
    return;
  }
  const decoded = verify(token || "",JWT_SECRET);
  
  if(!decoded || !(decoded as JwtPayload).userId){
    ws.close();
    return;
  }
  ws.on("message", (data) => {
    ws.send("hello");
  });
});
