import express from "express"
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from 'dotenv'
import appRouter from './routes/gateway'
import cors from 'cors'

const app = express()
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// In-memory message storage
const messagesByRoom = new Map();

const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))
app.use("/api/v1", appRouter)
app.use(express.json())

// Keep track of connected users and their rooms
const connectedUsers = new Map();
const userRooms = new Map();

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("user_connected", (address) => {
    connectedUsers.set(address, socket.id);
    console.log(`User ${address} connected with socket ${socket.id}`);
  });

  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
    
    // Send existing messages to the user
    const roomMessages = messagesByRoom.get(roomId) || [];
    socket.emit("message_history", roomMessages);
  });

  socket.on("send_message", (messageData) => {
    console.log("Message received:", messageData);
    
    // Create message object with timestamp
    const newMessage = {
      ...messageData,
      timestamp: new Date().toLocaleTimeString()
    };

    // Store the message
    if (!messagesByRoom.has(messageData.roomId)) {
      messagesByRoom.set(messageData.roomId, []);
    }
    messagesByRoom.get(messageData.roomId).push(newMessage);
    
    // Broadcast to everyone in the room including sender
    io.emit("receive_message", newMessage);
    
    console.log(`Message broadcast:`, newMessage);
  });

  socket.on("disconnect", () => {
    // Clean up user data
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
  console.log(`Server is running on port ${PORT}`)
})
