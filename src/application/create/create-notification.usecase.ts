import { Injectable, Logger } from "@nestjs/common";
import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { CreateNotificationDto } from "./create-notification.dto";

@Injectable()
export class CreateNotificationUseCase {
  private readonly logger = new Logger(CreateNotificationUseCase.name);

  constructor(private readonly amqp: AmqpConnection) {}

  async execute(dto: CreateNotificationDto): Promise<string> {
    this.logger.log(`📩 Publicando notificação ${dto.mensagemId}`);

    await this.amqp.publish("app_exchange", "notificar", {
      mensagemId: dto.mensagemId,
      conteudoMensagem: dto.conteudoMensagem,
    });

    this.logger.log(`✅ Notificação ${dto.mensagemId} publicada.`);
    return dto.mensagemId;
  }
}
