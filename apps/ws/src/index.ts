import WebSocket, { WebSocketServer } from "ws";
import { WS_PORT } from "@repo/config/config";
import checkUser from "./utils/checkUser";

interface User {
  userId: string;
  rooms: string[];
  ws: WebSocket;
}

console.log(WS_PORT);
const wss = new WebSocketServer({ port: WS_PORT as number });

const users: User[] = [];

wss.on("connection", (ws, req) => {
  const url = req.url ?? "";
  const params = new URLSearchParams(url.split("?")[1]);
  const token = params.get("token") ?? "";
  const userId = checkUser(token);
  if (!userId) {
    ws.close();
    return;
  }

  users.push({
    userId,
    rooms: [],
    ws: ws
  })

  ws.on("message", (data) => {
    const message = JSON.parse(data as unknown as string);
    if (message.type === "join_room") {
      const user = users.find((a) => a.ws === ws);
      user?.rooms.push(message.roomId);
    }

    if (message.type === "leave_room") {
      const user = users.find((x) => x.ws === ws);
      if(!user){
        return;
      }
      user.rooms = user?.rooms.filter((x) => x! !== message.roomId);
    }

    if(message.type === "chat"){
      const roomId = message.roomId;
      const userId = message.userId;

      users.forEach((user)=>{
        if(user.rooms.includes(roomId)){
          user.ws.send(JSON.stringify({
            type: "chat",
            message: message.message,
            userId: userId
          }))
        }
      })
    }
  });
});
