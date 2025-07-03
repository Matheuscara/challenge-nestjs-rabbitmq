import { ConfigModule, ConfigService } from "@nestjs/config";
import { RabbitMQConfig } from "@golevelup/nestjs-rabbitmq";
export declare const rabbitMqConfig: {
    imports: (typeof ConfigModule)[];
    inject: (typeof ConfigService)[];
    useFactory: (config: ConfigService) => RabbitMQConfig;
};
