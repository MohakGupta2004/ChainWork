import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';
import { useSocket } from '../context/SocketContext';

export default function Messages() {
  const { auth } = useAuth();
  const socket = useSocket();
  const location = useLocation();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [recipientAddress, setRecipientAddress] = useState('');
  const [roomId, setRoomId] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const recipient = searchParams.get('address');
    if (recipient && auth?.account) {
      setRecipientAddress(recipient);
      // Create a consistent room ID by sorting addresses
      const addresses = [auth.account, recipient].sort();
      const newRoomId = `${addresses[0]}-${addresses[1]}`;
      setRoomId(newRoomId);

      // Join the room when component mounts
      if (socket) {
        console.log('Joining room:', newRoomId);
        socket.emit('join_room', newRoomId);
      }
    }
  }, [location.search, auth?.account, socket]);

  useEffect(() => {
    if (socket) {
      // Listen for message history
      socket.on('message_history', (history) => {
        console.log('Received message history:', history);
        setMessages(history || []);
      });

      // Listen for new messages
      socket.on('receive_message', (newMessage) => {
        console.log('Received new message:', newMessage);
        setMessages(prev => [...prev, newMessage]);
      });

      return () => {
        socket.off('message_history');
        socket.off('receive_message');
      };
    }
  }, [socket]);

  const handleSendMessage = () => {
    if (!message.trim() || !socket) return;

    const newMessage = {
      content: message.trim(),
      sender: auth.account,
      receiver: recipientAddress,
      roomId: roomId,
      timestamp: new Date().toLocaleTimeString()
    };

    // Emit the message
    socket.emit('send_message', newMessage);
    
    // Clear input
    setMessage('');
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto p-4">
      <div className="bg-gray-800 p-4 rounded-t-lg">
        <h1 className="text-xl font-bold text-white">
          Chat with: {recipientAddress ? `${recipientAddress.slice(0, 6)}...${recipientAddress.slice(-4)}` : 'Loading...'}
        </h1>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === auth.account ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                msg.sender === auth.account
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 text-black'
              }`}
            >
              <p>{msg.content}</p>
              <p className="text-xs mt-1 opacity-70">{msg.timestamp}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="bg-gray-800 p-4 rounded-b-lg">
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type a message..."
            className="flex-1 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
