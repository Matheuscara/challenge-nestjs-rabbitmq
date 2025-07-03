import { Module } from "@nestjs/common";
import { CreateNotificationHandler } from "./create-notification.handler";
import { CustomRabbitMQModule } from "../message-broker";
import { CreateStatusNotificationHandler } from "./create-status-notification.handler";
import { GatewayModule } from "../gateway/gateway.module";

@Module({
  imports: [CustomRabbitMQModule, GatewayModule],
  providers: [CreateNotificationHandler, CreateStatusNotificationHandler],
  exports: [CreateNotificationHandler, CreateStatusNotificationHandler],
})
export class HandlerModule {}
