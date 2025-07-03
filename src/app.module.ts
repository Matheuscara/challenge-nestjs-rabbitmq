import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_INTERCEPTOR } from "@nestjs/core";
import * as Joi from "joi";
import { LoggerModule } from "./utils/logger";
import { HttpModule } from "@nestjs/axios";
import {
  CustomRabbitMQModule,
  HandlerModule,
  NotificationsController,
} from "./infrastructure";
import { LoggingInterceptor } from "./utils/interceptors/ logging.interceptor";
import { CreateNotificationUseCase } from "./application";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBITMQ_URL: Joi.string().uri().required(),
        RABBITMQ_QUEUE_INPUT: Joi.string().required(),
        RABBITMQ_QUEUE_STATUS: Joi.string().required(),
      }),
      validationOptions: {
        abortEarly: true,
      },
    }),
    LoggerModule,
    HttpModule.register({
      timeout: 5_000,
      maxRedirects: 5,
    }),
    CustomRabbitMQModule,
    HandlerModule,
  ],
  controllers: [NotificationsController],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    CreateNotificationUseCase,
  ],
})
export class AppModule {}
