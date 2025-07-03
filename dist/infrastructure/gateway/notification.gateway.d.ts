import { Server } from "socket.io";
export declare class NotificationGateway {
    private readonly logger;
    server: Server;
    afterInit(): void;
}
