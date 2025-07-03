import { NotificationId } from "./notification-id.vo";
import { DomainError } from "../errors/domain.error";
import { isUUID } from "class-validator";

describe("NotificationId Value Object", () => {
  it("should generate a valid UUID when no id is provided", () => {
    const vo = NotificationId.create();
    expect(vo).toBeInstanceOf(NotificationId);
    expect(vo.value).toBeDefined();
    expect(isUUID(vo.value)).toBeTruthy();
  });

  it("should accept a valid UUID when provided", () => {
    const validId = "123e4567-e89b-12d3-a456-426614174000";
    const vo = NotificationId.create(validId);
    expect(vo.value).toBe(validId);
    expect(isUUID(vo.value)).toBeTruthy();
  });

  it("should throw DomainError for an invalid UUID", () => {
    const invalidId = "not-a-valid-uuid";
    expect(() => NotificationId.create(invalidId)).toThrow(DomainError);
    expect(() => NotificationId.create(invalidId)).toThrow(
      "ID de notificação inválido. Deve ser um UUID.",
    );
  });
});
