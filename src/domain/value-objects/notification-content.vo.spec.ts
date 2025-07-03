import { NotificationContent } from "./notification-content.vo";
import { DomainError } from "../errors/domain.error";

describe("NotificationContent Value Object", () => {
  it("should create with trimmed content", () => {
    const raw = "  Hello Angular  ";
    const vo = NotificationContent.create(raw);
    expect(vo).toBeInstanceOf(NotificationContent);
    expect(vo.value).toBe("Hello Angular");
  });

  it("should accept content of exactly 500 characters", () => {
    const long = "a".repeat(500);
    const vo = NotificationContent.create(long);
    expect(vo.value.length).toBe(500);
    expect(vo.value).toBe(long);
  });

  it("should throw if content is empty string", () => {
    expect(() => NotificationContent.create("")).toThrow(DomainError);
  });

  it("should throw if content is only whitespace", () => {
    expect(() => NotificationContent.create("    ")).toThrow(DomainError);
  });

  it("should throw if content exceeds 500 characters", () => {
    const tooLong = "b".repeat(501);
    expect(() => NotificationContent.create(tooLong)).toThrow(DomainError);
  });
});
