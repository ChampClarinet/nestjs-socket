import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AlertGateway } from './alert.gateway';

@Controller('alert')
export class AlertController {

    constructor(
        private alertGateway: AlertGateway,
    ) { }

    @Post()
    @HttpCode(HttpStatus.OK)
    sendAlertToAll(@Body() dto: { message: string }) {
        this.alertGateway.sendToAll(dto.message);
        return dto;
    }

}
