export type StatusTypes = "AGUARDANDO_PROCESSAMENTO" | "PROCESSADO_SUCESSO" | "FALHA_PROCESSAMENTO";
export declare class NotificationStatus {
    private readonly _value;
    private constructor();
    static awaiting(): NotificationStatus;
    static success(): NotificationStatus;
    static failure(): NotificationStatus;
    private validate;
    get value(): StatusTypes;
}
