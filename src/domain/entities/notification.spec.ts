import { Notification } from "./notification.entity";
import { DomainError } from "../errors/domain.error";

describe("Notification Entity", () => {
  it("should create a notification with awaiting status", () => {
    const content = "Hello World";
    const notif = Notification.create(content);

    expect(notif).toBeInstanceOf(Notification);
    expect(notif.id).toBeDefined();
    expect(notif.content).toBe(content);
    expect(notif.status).toBe("AGUARDANDO_PROCESSAMENTO");
    expect(notif.timestamp).toBeInstanceOf(Date);
    expect(notif.timestamp.getTime()).toBeLessThanOrEqual(Date.now());
  });

  it("should create a notification with provided id", () => {
    const customId = "123e4567-e89b-12d3-a456-426614174000";
    const content = "Test Content";
    const notif = Notification.createWithId(customId, content);

    expect(notif.id).toBe(customId);
    expect(notif.content).toBe(content);
    expect(notif.status).toBe("AGUARDANDO_PROCESSAMENTO");
  });

  it("should throw when creating with empty content", () => {
    expect(() => Notification.create("")).toThrow(DomainError);
    expect(() => Notification.create("   ")).toThrow(DomainError);
  });

  it("should throw when creating with invalid UUID", () => {
    const badId = "not-a-uuid";
    expect(() => Notification.createWithId(badId, "ok")).toThrow(DomainError);
  });

  it("should transition to success status", () => {
    const notif = Notification.create("OK");
    notif.markSuccess();
    expect(notif.status).toBe("PROCESSADO_SUCESSO");
  });

  it("should transition to failure status", () => {
    const notif = Notification.create("OK");
    notif.markFailure();
    expect(notif.status).toBe("FALHA_PROCESSAMENTO");
  });
});
