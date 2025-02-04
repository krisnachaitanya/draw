import { WebSocketServer } from "ws";
import { JwtPayload, verify } from "jsonwebtoken";
import { JWT_SECRET, WS_PORT } from "@repo/config/config";

console.log(WS_PORT)
const wss = new WebSocketServer({ port: WS_PORT as number });

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
