import { Test, TestingModule } from "@nestjs/testing";
import { CreateNotificationUseCase } from "./create-notification.usecase";
import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { CreateNotificationDto } from "./create-notification.dto";

describe("CreateNotificationUseCase", () => {
  let useCase: CreateNotificationUseCase;
  let amqpConnection: Partial<AmqpConnection>;

  beforeEach(async () => {
    // cria um mock do AmqpConnection
    amqpConnection = {
      publish: jest.fn().mockResolvedValue(undefined),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateNotificationUseCase,
        { provide: AmqpConnection, useValue: amqpConnection },
      ],
    }).compile();

    useCase = module.get<CreateNotificationUseCase>(CreateNotificationUseCase);
  });

  it("should be defined", () => {
    expect(useCase).toBeDefined();
  });

  it("should publish notification and return mensagemId", async () => {
    const dto: CreateNotificationDto = {
      mensagemId: "123e4567-e89b-12d3-a456-426614174000",
      conteudoMensagem: "Olá Mundo",
    };

    const result = await useCase.execute(dto);

    expect(result).toBe(dto.mensagemId);
    expect(amqpConnection.publish).toHaveBeenCalledTimes(1);
    expect(amqpConnection.publish).toHaveBeenCalledWith(
      "app_exchange",
      "notificar",
      {
        mensagemId: dto.mensagemId,
        conteudoMensagem: dto.conteudoMensagem,
      },
    );
  });

  it("should propagate errors from AmqpConnection.publish", async () => {
    (amqpConnection.publish as jest.Mock).mockRejectedValueOnce(
      new Error("Fail"),
    );

    const dto: CreateNotificationDto = {
      mensagemId: "id-error",
      conteudoMensagem: "Erro",
    };

    await expect(useCase.execute(dto)).rejects.toThrow("Fail");
  });
});
