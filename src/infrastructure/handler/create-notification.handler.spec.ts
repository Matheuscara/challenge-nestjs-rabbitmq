// src/infrastructure/handlers/create-notification.handler.spec.ts

import { Test, TestingModule } from "@nestjs/testing";
import { CreateNotificationHandler } from "./create-notification.handler";
import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { Notification } from "../../domain/entities/notification.entity";

describe("CreateNotificationHandler", () => {
  let handler: CreateNotificationHandler;
  let amqp: Partial<AmqpConnection>;

  beforeEach(async () => {
    amqp = {
      publish: jest.fn().mockResolvedValue(undefined),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateNotificationHandler,
        { provide: AmqpConnection, useValue: amqp },
      ],
    }).compile();

    handler = module.get(CreateNotificationHandler);
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  const payload = {
    mensagemId: "123e4567-e89b-12d3-a456-426614174000",
    conteudoMensagem: "Test",
  };

  it("should process and publish SUCCESS status", async () => {
    jest.spyOn(Math, "random").mockReturnValue(0.5);

    const promise = handler.handle(payload);

    jest.advanceTimersByTime(2000);
    await promise;

    expect(amqp.publish).toHaveBeenCalledWith("app_exchange", "status", {
      mensagemId: payload.mensagemId,
      status: "PROCESSADO_SUCESSO",
    });
  });

  it("should process and publish FAILURE status", async () => {
    jest.spyOn(Math, "random").mockReturnValue(0.1);

    const promise = handler.handle(payload);

    jest.advanceTimersByTime(2000);
    await promise;

    expect(amqp.publish).toHaveBeenCalledWith("app_exchange", "status", {
      mensagemId: payload.mensagemId,
      status: "FALHA_PROCESSAMENTO",
    });
  });

  it("should construct Notification entity correctly", async () => {
    const spyCreate = jest.spyOn(Notification, "createWithId");
    jest.spyOn(Math, "random").mockReturnValue(0.5);

    const promise = handler.handle(payload);
    jest.advanceTimersByTime(2000);
    await promise;

    expect(spyCreate).toHaveBeenCalledWith(
      payload.mensagemId,
      payload.conteudoMensagem,
    );
  });
});
