

import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import appRouter from "./routes/gateway";
import cors from "cors";

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/api/v1", appRouter);
app.use(express.json());

// In-memory storage
const messagesByRoom = new Map();
const connectedUsers = new Map();

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Handle user connection
  socket.on("user_connected", (address) => {
    connectedUsers.set(address, socket.id);
    console.log(`User ${address} connected with socket ${socket.id}`);
  });

  // Handle joining a chat room
  socket.on("join_room", (roomId) => {
    const normalizedRoomId = roomId.toLowerCase();  // 🔹 Convert to lowercase
    socket.join(normalizedRoomId);
    console.log(`✅ User ${socket.id} joined room: ${normalizedRoomId}`);

    // Send existing messages
    const roomMessages = messagesByRoom.get(normalizedRoomId) || [];
    socket.emit("message_history", roomMessages);
  });


  // Handle sending messages
  socket.on("send_message", (messageData) => {
    const normalizedRoomId = messageData.roomId.toLowerCase();  // 🔹 Convert to lowercase
    console.log("📨 Message received:", messageData);

    const newMessage = {
        ...messageData,
        timestamp: new Date().toLocaleTimeString(),
    };

    // Store the message
    if (!messagesByRoom.has(normalizedRoomId)) {
        messagesByRoom.set(normalizedRoomId, []);
    }
    messagesByRoom.get(normalizedRoomId).push(newMessage);

    // Debugging: Check users in the room
    const roomSockets = io.sockets.adapter.rooms.get(normalizedRoomId);
    console.log(`📢 Sending message to room: ${normalizedRoomId}`);
    console.log(`👥 Users in room:`, roomSockets ? Array.from(roomSockets) : "No users");

    // Broadcast message
    io.to(normalizedRoomId).emit("receive_message", newMessage);
  });


  // Handle fetching conversations
  socket.on("get_conversations", (userAddress) => {
    console.log(`Fetching conversations for: ${userAddress}`);

    const conversations: any = [];

    // Find all rooms where the user has messages
    messagesByRoom.forEach((messages, roomId) => {
      if (roomId.includes(userAddress)) {
        // Extract recipient address
        const participants = roomId.split("-");
        const recipient = participants.find((addr) => addr !== userAddress);

        // Get the last message
        const lastMessage =
          messages.length > 0 ? messages[messages.length - 1].content : "No messages yet";

        conversations.push({
          address: recipient,
          lastMessage,
        });
      }
    });

    console.log(`Emitting conversations list to ${userAddress}:`, conversations);
    socket.emit("conversations_list", conversations);
  });

  // Handle user disconnection
  socket.on("disconnect", () => {
    for (const [address, socketId] of connectedUsers.entries()) {
      if (socketId === socket.id) {
        connectedUsers.delete(address);
        console.log(`User ${address} disconnected`);
        break;
      }
    }
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


