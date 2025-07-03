import { ConfigModule, ConfigService } from "@nestjs/config";
import { RabbitMQConfig } from "@golevelup/nestjs-rabbitmq";

export const rabbitMqConfig = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService): RabbitMQConfig => ({
    uri: config.get<string>("RABBITMQ_URL") as string,
    prefetchCount: 5,
    connectionInitOptions: {
      wait: true,
      timeout: 60000,
      reject: true,
    },
    enableControllerDiscovery: true,

    exchanges: [
      {
        name: "app_exchange",
        type: "direct",
      },
      {
        name: "dead_letter_exchange",
        type: "direct",
      },
    ],
  }),
};
