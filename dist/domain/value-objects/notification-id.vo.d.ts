export declare class NotificationId {
    private readonly _value;
    private constructor();
    static create(id?: string): NotificationId;
    private validate;
    get value(): string;
}
