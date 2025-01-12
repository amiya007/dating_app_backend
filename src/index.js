const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const { PORT } = require("./config/server");
const { connect } = require("./config/db");

async function initializeApp() {
  const app = express();

  // Middleware
  app.use(cors({ origin: "*", credentials: true }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Routes;
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  return app;
}

function initializeSocketServer(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Handle incoming messages
    socket.on("send_message", (data) => {
      console.log("Message received:", data);
      io.emit("receive_message", data); // Broadcast message to all clients
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  return io;
}

async function runServer() {
  try {
    // Initialize app and database
    const app = await initializeApp();
    await connect();
    console.log("Connected to the database");

    // Create HTTP server
    const server = http.createServer(app);

    // Initialize Socket.IO server
    initializeSocketServer(server);

    // Start the server
    server.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error.message);
    process.exit(1);
  }
}

runServer();
