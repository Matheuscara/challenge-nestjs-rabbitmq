import { Injectable, Logger } from "@nestjs/common";
import { RabbitSubscribe } from "@golevelup/nestjs-rabbitmq";
import { NotificationGateway } from "../gateway/notification.gateway";

const QUEUE_STATUS = process.env.RABBITMQ_QUEUE_STATUS;

export interface StatusPayload {
  mensagemId: string;
  status: "PROCESSADO_SUCESSO" | "FALHA_PROCESSAMENTO";
}

@Injectable()
export class CreateStatusNotificationHandler {
  private readonly logger = new Logger(CreateStatusNotificationHandler.name);

  constructor(private readonly gateway: NotificationGateway) {}

  @RabbitSubscribe({
    exchange: "app_exchange",
    routingKey: "status",
    queue: QUEUE_STATUS,
    queueOptions: {
      durable: true,
      autoDelete: false,
      arguments: {},
    },
  })
  public async handle({ mensagemId, status }: StatusPayload): Promise<void> {
    this.logger.log(`📨 Status recebido: ${mensagemId} → ${status}`);

    this.gateway.server.emit("notificationStatus", { mensagemId, status });

    return;
  }
}
