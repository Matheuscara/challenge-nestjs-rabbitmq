import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { CreateNotificationDto } from "./create-notification.dto";
export declare class CreateNotificationUseCase {
    private readonly amqp;
    private readonly logger;
    constructor(amqp: AmqpConnection);
    execute(dto: CreateNotificationDto): Promise<string>;
}
