import { Server } from "socket.io";

export function initSocket(server) {
  const io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // Join poll room
    socket.on("joinPoll", (data) => {
      socket.join(`poll_${data.pollId}`);
      console.log(`Socket ${socket.id} joined poll_${data.pollId}`);
    });

    // Leave poll room
    socket.on("leavePoll", (data) => {
      socket.leave(`poll_${data.pollId}`);
      console.log(`Socket ${socket.id} left poll_${data.pollId}`);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  return io;
}
