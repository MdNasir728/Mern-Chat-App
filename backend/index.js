const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const setupSocketIO = require("./socketIO");

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    const server = http.createServer(app);
    server.listen(5000, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    // Socket.IO logic in a separate module
    setupSocketIO(server);
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
  }
};



connectToDB();

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
