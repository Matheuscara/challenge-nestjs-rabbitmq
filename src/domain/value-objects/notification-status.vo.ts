import { DomainError } from "../errors/domain.error";

export type StatusTypes =
  | "AGUARDANDO_PROCESSAMENTO"
  | "PROCESSADO_SUCESSO"
  | "FALHA_PROCESSAMENTO";

export class NotificationStatus {
  private readonly _value: StatusTypes;

  private constructor(status: StatusTypes) {
    this._value = status;
    this.validate();
  }

  public static awaiting(): NotificationStatus {
    return new NotificationStatus("AGUARDANDO_PROCESSAMENTO");
  }

  public static success(): NotificationStatus {
    return new NotificationStatus("PROCESSADO_SUCESSO");
  }

  public static failure(): NotificationStatus {
    return new NotificationStatus("FALHA_PROCESSAMENTO");
  }

  private validate(): void {
    const allowed: StatusTypes[] = [
      "AGUARDANDO_PROCESSAMENTO",
      "PROCESSADO_SUCESSO",
      "FALHA_PROCESSAMENTO",
    ];
    if (!allowed.includes(this._value)) {
      throw new DomainError(`Status inválido: ${this._value}`);
    }
  }

  get value(): StatusTypes {
    return this._value;
  }
}
