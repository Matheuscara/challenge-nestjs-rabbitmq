import { NotificationGateway } from "../gateway/notification.gateway";
export interface StatusPayload {
    mensagemId: string;
    status: "PROCESSADO_SUCESSO" | "FALHA_PROCESSAMENTO";
}
export declare class CreateStatusNotificationHandler {
    private readonly gateway;
    private readonly logger;
    constructor(gateway: NotificationGateway);
    handle({ mensagemId, status }: StatusPayload): Promise<void>;
}
