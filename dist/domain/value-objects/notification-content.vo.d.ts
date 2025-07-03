export declare class NotificationContent {
    private readonly _value;
    private constructor();
    static create(content: string): NotificationContent;
    private validate;
    get value(): string;
}
