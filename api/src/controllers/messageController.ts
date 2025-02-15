import type { Request, Response } from 'express';

// In-memory storage for messages (replace with database in production)
const messages: { [key: string]: any[] } = {};

export const getMessages = async (req: Request, res: Response) => {
  const { roomId } = req.params;
  
  try {
    const roomMessages = messages[roomId] || [];
    res.json(roomMessages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Error fetching messages" });
  }
};

export const createMessage = async (req: Request, res: Response) => {
  const { roomId } = req.params;
  const { sender, content } = req.body;
  
  try {
    const newMessage = {
      sender,
      content,
      timestamp: new Date(),
      roomId
    };

    if (!messages[roomId]) {
      messages[roomId] = [];
    }
    
    messages[roomId].push(newMessage);
    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error creating message:", error);
    res.status(500).json({ message: "Error creating message" });
  }
}; 