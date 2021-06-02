import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

const socketPort = +(process.env.SOCKET_PORT || 3001);

@WebSocketGateway(socketPort, { namespace: '/alert' })
export class AlertGateway {

  @WebSocketServer() wss: Server;

  sendToAll(message: string) {
    this.wss.emit('alertToClient', { type: 'alert', message });
  }

}
