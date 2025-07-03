import { Injectable, Logger } from "@nestjs/common";
import { RabbitSubscribe, AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { Notification } from "../../domain/entities/notification.entity";

const QUEUE_INPUT = process.env.RABBITMQ_QUEUE_INPUT;
const QUEUE_STATUS = process.env.RABBITMQ_QUEUE_STATUS;

@Injectable()
export class CreateNotificationHandler {
  private readonly logger = new Logger(CreateNotificationHandler.name);

  constructor(private readonly amqp: AmqpConnection) {}

  @RabbitSubscribe({
    exchange: "app_exchange",
    routingKey: "notificar",
    queue: QUEUE_INPUT,
    queueOptions: {
      durable: true,
      autoDelete: false,
      arguments: {
        "x-dead-letter-exchange": "dead_letter_exchange",
        "x-dead-letter-routing-key": "retry",
        "x-max-length": 500,
        "x-message-ttl": 300_000,
      },
    },
  })
  public async handle({
    mensagemId,
    conteudoMensagem,
  }: {
    mensagemId: string;
    conteudoMensagem: string;
  }): Promise<void> {
    const notification = Notification.createWithId(
      mensagemId,
      conteudoMensagem,
    );
    this.logger.log(`📥 Iniciando processamento: ${notification.id}`);

    await new Promise((r) => setTimeout(r, 1000 + Math.random() * 1000));

    if (Math.random() < 0.2) {
      notification.markFailure();
    } else {
      notification.markSuccess();
    }

    await this.amqp.publish("app_exchange", "status", {
      mensagemId: notification.id,
      status: notification.status,
    });

    this.logger.log(`📤 ${notification.id} → ${notification.status}`);

    return;
  }
}
