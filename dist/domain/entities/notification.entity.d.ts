export declare class Notification {
    private readonly _id;
    private readonly _content;
    private _status;
    private readonly _timestamp;
    private constructor();
    static create(content: string): Notification;
    static createWithId(id: string, content: string): Notification;
    private validate;
    markSuccess(): void;
    markFailure(): void;
    get id(): string;
    get content(): string;
    get status(): string;
    get timestamp(): Date;
}
