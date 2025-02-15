import { MessageStore, Message, Conversation } from '../types/message';

export const messageStore: MessageStore = {
  messagesByRoom: new Map(),
  conversations: [],
  connectedUsers: new Map()
};

export const addMessage = (message: Message) => {
  // Store message in room
  if (!messageStore.messagesByRoom.has(message.roomId)) {
    messageStore.messagesByRoom.set(message.roomId, []);
  }
  messageStore.messagesByRoom.get(message.roomId)?.push(message);

  // Update or create conversation
  const conversationExists = messageStore.conversations.some(conv => 
    conv.participants.includes(message.sender) && 
    conv.participants.includes(message.receiver)
  );

  if (!conversationExists) {
    messageStore.conversations.push({
      participants: [message.sender, message.receiver],
      lastMessage: message,
      timestamp: new Date()
    });
  } else {
    const conversation = messageStore.conversations.find(conv => 
      conv.participants.includes(message.sender) && 
      conv.participants.includes(message.receiver)
    );
    if (conversation) {
      conversation.lastMessage = message;
      conversation.timestamp = new Date();
    }
  }
};

export const getUserConversations = (address: string): string[] => {
  return messageStore.conversations
    .filter(conv => conv.participants.includes(address))
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .map(conv => conv.participants.find(p => p !== address) || '');
};

export const getRoomMessages = (roomId: string): Message[] => {
  return messageStore.messagesByRoom.get(roomId) || [];
}; 