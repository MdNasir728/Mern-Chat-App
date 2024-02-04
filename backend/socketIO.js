const socketIO = require("socket.io");

const setupSocketIO = (server) => {
  const io = socketIO(server, {
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    console.log(`Connected to socket.io ${socket.id}`);

    socket.on("setup", (userData) => {
      socket.join(userData._id);
      io.emit("connected");
    });

    socket.on("join chat", (room) => {
      socket.join(room);
      console.log("User Joined Room: " + room);
    });

    // Handle incoming messages
    socket.on("newMessage", (data) => {
      console.log(`line 26 -- ${data.text}`)
      // Broadcast the message to all connected clients
      io.in(data.chatId).emit("receivedMessage", data);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

module.exports = setupSocketIO;
