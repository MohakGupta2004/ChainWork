export interface Message {
  id?: string;
  sender: string;
  receiver: string;
  content: string;
  roomId: string;
  timestamp: Date;
}

export interface ChatRoom {
  id: string;
  participants: string[];
  messages: Message[];
  createdAt: Date;
} 