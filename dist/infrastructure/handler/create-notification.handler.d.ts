import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
export declare class CreateNotificationHandler {
    private readonly amqp;
    private readonly logger;
    constructor(amqp: AmqpConnection);
    handle({ mensagemId, conteudoMensagem, }: {
        mensagemId: string;
        conteudoMensagem: string;
    }): Promise<void>;
}
