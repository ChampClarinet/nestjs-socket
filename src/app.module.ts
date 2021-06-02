import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { ChatGateway } from './chat/chat.gateway';
import { AlertController } from './alert/alert.controller';
import { AlertGateway } from './alert/alert.gateway';

@Module({
  imports: [],
  controllers: [AlertController],
  providers: [
    // AppGateway,
    ChatGateway,
    AlertGateway,
  ],
})
export class AppModule {}
