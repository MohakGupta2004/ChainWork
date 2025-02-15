import { Server, Socket } from 'socket.io';
import type { Message } from '../types/message';

export class WebSocketService {
  private _io: Server;

  constructor() {
    this._io = new Server({
      cors:{
        origin: "*",
        credentials: true
      }
    }) 
      
  }

  public initListner() {
    const io = this.io;
    io.on('connect', (socket)=>{
      console.log('New client connected:', socket.id);

      socket.on('join_room', (roomId: string) => {
        socket.join(roomId);
        console.log(`User ${socket.id} joined room ${roomId}`);
      });

      socket.on('send_message', (message: Message) => {
        this.io.to(message.roomId).emit('receive_message', message);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
      });
    })
  }

  get io(){
    return this._io;
  }
} 
