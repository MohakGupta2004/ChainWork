import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSocket } from '../context/SocketContext';

export default function Messages() {
  const { auth } = useAuth();
  const socket = useSocket();
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [recipientAddress, setRecipientAddress] = useState('');
  const [roomId, setRoomId] = useState('');
  const [conversations, setConversations] = useState([]);

  // Fetch conversations when component mounts
  useEffect(() => {
    if (socket && auth?.account) {
      socket.emit('get_conversations', auth.account);
      
      const handleConversationsList = (list) => {
        console.log('Received conversations:', list);
        setConversations(list);
      };
      
      socket.on('conversations_list', handleConversationsList);
      return () => socket.off('conversations_list', handleConversationsList);
    }
  }, [socket, auth?.account]);

  // Handle chat room joining
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const recipient = searchParams.get('address');
    
    if (recipient && auth?.account) {
      setRecipientAddress(recipient);
      const addresses = [auth.account, recipient].sort();
      const newRoomId = `${addresses[0]}-${addresses[1]}`;
      setRoomId(newRoomId);
      socket.emit('join_room', newRoomId);
    }
  }, [location.search, auth?.account, socket]);

  // Listen for messages
  useEffect(() => {
    if (socket) {
      socket.on('message_history', (history) => {
        console.log('Received message history:', history);
        setMessages(history || []);
      });

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

  const handleSelectConversation = (address) => {
    const basePath = auth.userType === 'client' ? '/client' : '/freelancer';
    navigate(`${basePath}/messages?address=${address}`);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">Conversations</h2>
        </div>
        <div className="overflow-y-auto">
          {conversations.map((conv, index) => (
            <div
              key={index}
              onClick={() => handleSelectConversation(conv.address)}
              className={`p-4 cursor-pointer hover:bg-gray-700 ${
                conv.address === recipientAddress ? 'bg-gray-700' : ''
              }`}
            >
              <p className="truncate">
                {conv.address.slice(0, 6)}...{conv.address.slice(-4)}
              </p>
              <p className="text-sm text-gray-300">{conv.lastMessage}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {recipientAddress ? (
          <>
            <div className="bg-gray-800 p-4">
              <h1 className="text-xl font-bold text-white">
                Chat with: {`${recipientAddress.slice(0, 6)}...${recipientAddress.slice(-4)}`}
              </h1>
            </div>

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

            <div className="bg-gray-800 p-4">
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
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  );
}
