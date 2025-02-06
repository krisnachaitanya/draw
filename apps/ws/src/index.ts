import WebSocket, { WebSocketServer } from "ws";
import { WS_PORT } from "@repo/config/config";
import checkUser from "./utils/checkUser";
import { prismaClient } from "@repo/db/client";

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
    ws: ws,
  });

  ws.on("message", async(data) => {
    const message = JSON.parse(data as unknown as string);
    const user = users.find((a) => a.ws === ws);

    if (!user) {
      return;
    }

    if (message.type === "join_room") {
      user?.rooms.push(message.roomId);
    }

    if (message.type === "leave_room") {
      user.rooms = user?.rooms.filter((x) => x! !== message.roomId);
    }

    if (message.type === "chat") {
      const roomId = message.roomId;

      await prismaClient.chat.create({
        data: {
          message: message.message,
          roomId: Number(roomId),
          userId: user.userId,
        },
      });

      users.forEach((user) => {
        if (user.rooms.includes(roomId)) {
          user.ws.send(
            JSON.stringify({
              type: "chat",
              message: message.message,
              userId: user.userId,
            })
          );
        }
      });
    }
  });
});
