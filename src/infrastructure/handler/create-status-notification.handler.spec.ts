import { Test, TestingModule } from "@nestjs/testing";
import {
  CreateStatusNotificationHandler,
  StatusPayload,
} from "./create-status-notification.handler";
import { NotificationGateway } from "../gateway/notification.gateway";

describe("CreateStatusNotificationHandler", () => {
  let handler: CreateStatusNotificationHandler;
  let gateway: NotificationGateway;

  beforeEach(async () => {
    gateway = {
      server: {
        emit: jest.fn(),
      },
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateStatusNotificationHandler,
        { provide: NotificationGateway, useValue: gateway },
      ],
    }).compile();

    handler = module.get<CreateStatusNotificationHandler>(
      CreateStatusNotificationHandler,
    );
  });

  it("should be defined", () => {
    expect(handler).toBeDefined();
  });

  it("should emit notificationStatus event via gateway", async () => {
    const payload: StatusPayload = {
      mensagemId: "abc-123",
      status: "PROCESSADO_SUCESSO",
    };

    await handler.handle(payload);

    expect(gateway.server.emit).toHaveBeenCalledTimes(1);
    expect(gateway.server.emit).toHaveBeenCalledWith("notificationStatus", {
      mensagemId: payload.mensagemId,
      status: payload.status,
    });
  });

  it("should log receipt of status message", async () => {
    const logSpy = jest.spyOn((handler as any).logger, "log");
    const payload: StatusPayload = {
      mensagemId: "xyz-789",
      status: "FALHA_PROCESSAMENTO",
    };

    await handler.handle(payload);

    expect(logSpy).toHaveBeenCalledWith(
      `📨 Status recebido: ${payload.mensagemId} → ${payload.status}`,
    );
  });
});
