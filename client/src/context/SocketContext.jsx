import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { auth } = useAuth();

  useEffect(() => {
    if (auth?.account) {
      const newSocket = io('https://work3-y5ld.onrender.com');
      
      // When connected, send user's address
      newSocket.on('connect', () => {
        newSocket.emit('user_connected', auth.account);
        console.log('Socket connected with address:', auth.account);
      });

      setSocket(newSocket);

      return () => newSocket.close();
    }
  }, [auth?.account]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext); 
