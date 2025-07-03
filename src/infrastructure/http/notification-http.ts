import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import {
  CreateNotificationDto,
  CreateNotificationUseCase,
} from "../../application";

@ApiTags("Notificações")
@Controller("api/notificar")
export class NotificationsController {
  constructor(private readonly createNotification: CreateNotificationUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() dto: CreateNotificationDto,
  ): Promise<{ mensagemId: string }> {
    const mensagemId = await this.createNotification.execute(dto);
    return { mensagemId };
  }
}
