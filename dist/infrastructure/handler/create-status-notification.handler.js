"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var CreateStatusNotificationHandler_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateStatusNotificationHandler = void 0;
const common_1 = require("@nestjs/common");
const nestjs_rabbitmq_1 = require("@golevelup/nestjs-rabbitmq");
const notification_gateway_1 = require("../gateway/notification.gateway");
const QUEUE_STATUS = process.env.RABBITMQ_QUEUE_STATUS;
let CreateStatusNotificationHandler = CreateStatusNotificationHandler_1 = class CreateStatusNotificationHandler {
    gateway;
    logger = new common_1.Logger(CreateStatusNotificationHandler_1.name);
    constructor(gateway) {
        this.gateway = gateway;
    }
    async handle({ mensagemId, status }) {
        this.logger.log(`📨 Status recebido: ${mensagemId} → ${status}`);
        this.gateway.server.emit("notificationStatus", { mensagemId, status });
        return;
    }
};
exports.CreateStatusNotificationHandler = CreateStatusNotificationHandler;
__decorate([
    (0, nestjs_rabbitmq_1.RabbitSubscribe)({
        exchange: "app_exchange",
        routingKey: "status",
        queue: QUEUE_STATUS,
        queueOptions: {
            durable: true,
            autoDelete: false,
            arguments: {},
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CreateStatusNotificationHandler.prototype, "handle", null);
exports.CreateStatusNotificationHandler = CreateStatusNotificationHandler = CreateStatusNotificationHandler_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [notification_gateway_1.NotificationGateway])
], CreateStatusNotificationHandler);
//# sourceMappingURL=create-status-notification.handler.js.map