import { Server } from "socket.io";

export function initSocket(server) {
  const io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // Join poll room
    socket.on("joinPoll", (pollId) => {
      socket.join(`poll_${pollId}`);
      console.log(`Socket ${socket.id} joined poll_${pollId}`);
    });

    // Leave poll room
    socket.on("leavePoll", (pollId) => {
      socket.leave(`poll_${pollId}`);
      console.log(`Socket ${socket.id} left poll_${pollId}`);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  return io;
}
