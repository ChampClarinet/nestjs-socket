import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

const socketPort = +(process.env.SOCKET_PORT || 3001);

@WebSocketGateway(socketPort, {
  namespace: '/',
  origins: 'http://localhost:3000',
})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  
  @WebSocketServer() wss: Server;
  private logger = new Logger('AppGateway');
  
  afterInit(server: Server) {
    this.logger.log('Initialized!');
  }
  
  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, text: string): void {
    this.wss.emit('msgToClient', text);
    // return { event: 'msgToClient', data: text };
  }

}
