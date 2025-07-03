import { CreateNotificationDto, CreateNotificationUseCase } from "../../application";
export declare class NotificationsController {
    private readonly createNotification;
    constructor(createNotification: CreateNotificationUseCase);
    create(dto: CreateNotificationDto): Promise<{
        mensagemId: string;
    }>;
}
