import { randomUUID } from "crypto";
import { isUUID } from "class-validator";
import { DomainError } from "../errors/domain.error";

export class NotificationId {
  private readonly _value: string;

  private constructor(id: string) {
    this._value = id;
    this.validate();
  }

  public static create(id?: string): NotificationId {
    return new NotificationId(id ?? randomUUID());
  }

  private validate(): void {
    if (!isUUID(this._value)) {
      throw new DomainError("ID de notificação inválido. Deve ser um UUID.");
    }
  }

  get value(): string {
    return this._value;
  }
}
