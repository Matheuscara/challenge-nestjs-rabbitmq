import { DomainError } from "../errors/domain.error";

export class NotificationContent {
  private readonly _value: string;

  private constructor(content: string) {
    this._value = content.trim();
    this.validate();
  }

  public static create(content: string): NotificationContent {
    return new NotificationContent(content);
  }

  private validate(): void {
    if (this._value.length === 0) {
      throw new DomainError("Conteúdo da notificação não pode ser vazio.");
    }
    if (this._value.length > 500) {
      throw new DomainError(
        "Conteúdo da notificação não pode exceder 500 caracteres.",
      );
    }
  }

  get value(): string {
    return this._value;
  }
}
