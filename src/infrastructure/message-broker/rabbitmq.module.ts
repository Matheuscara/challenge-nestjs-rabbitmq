import { Module } from "@nestjs/common";
import { RabbitMQModule } from "@golevelup/nestjs-rabbitmq";
import { rabbitMqConfig } from "./config";

@Module({
  imports: [RabbitMQModule.forRootAsync(rabbitMqConfig)],
  exports: [RabbitMQModule],
})
export class CustomRabbitMQModule {}
