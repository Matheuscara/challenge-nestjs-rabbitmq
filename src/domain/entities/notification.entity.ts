import { DomainError } from "../errors/domain.error";
import { NotificationContent } from "../value-objects/notification-content.vo";
import { NotificationId } from "../value-objects/notification-id.vo";
import { NotificationStatus } from "../value-objects/notification-status.vo";

export class Notification {
  private readonly _id: NotificationId;
  private readonly _content: NotificationContent;
  private _status: NotificationStatus;
  private readonly _timestamp: Date;

  private constructor(
    id: NotificationId,
    content: NotificationContent,
    status: NotificationStatus,
    timestamp: Date,
  ) {
    this._id = id;
    this._content = content;
    this._status = status;
    this._timestamp = timestamp;
    this.validate();
  }

  public static create(content: string): Notification {
    return new Notification(
      NotificationId.create(),
      NotificationContent.create(content),
      NotificationStatus.awaiting(),
      new Date(),
    );
  }

  public static createWithId(id: string, content: string): Notification {
    return new Notification(
      NotificationId.create(id),
      NotificationContent.create(content),
      NotificationStatus.awaiting(),
      new Date(),
    );
  }

  private validate(): void {
    if (!(this._timestamp instanceof Date)) {
      throw new DomainError("Timestamp inválido.");
    }
    if (this._timestamp.getTime() > Date.now()) {
      throw new DomainError("Timestamp não pode ser no futuro.");
    }
  }

  public markSuccess(): void {
    this._status = NotificationStatus.success();
  }

  public markFailure(): void {
    this._status = NotificationStatus.failure();
  }

  get id(): string {
    return this._id.value;
  }

  get content(): string {
    return this._content.value;
  }

  get status(): string {
    return this._status.value;
  }

  get timestamp(): Date {
    return this._timestamp;
  }
}
