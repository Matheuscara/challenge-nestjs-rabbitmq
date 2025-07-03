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
var CreateNotificationHandler_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateNotificationHandler = void 0;
const common_1 = require("@nestjs/common");
const nestjs_rabbitmq_1 = require("@golevelup/nestjs-rabbitmq");
const notification_entity_1 = require("../../domain/entities/notification.entity");
const QUEUE_INPUT = process.env.RABBITMQ_QUEUE_INPUT;
const QUEUE_STATUS = process.env.RABBITMQ_QUEUE_STATUS;
let CreateNotificationHandler = CreateNotificationHandler_1 = class CreateNotificationHandler {
    amqp;
    logger = new common_1.Logger(CreateNotificationHandler_1.name);
    constructor(amqp) {
        this.amqp = amqp;
    }
    async handle({ mensagemId, conteudoMensagem, }) {
        const notification = notification_entity_1.Notification.createWithId(mensagemId, conteudoMensagem);
        this.logger.log(`📥 Iniciando processamento: ${notification.id}`);
        await new Promise((r) => setTimeout(r, 1000 + Math.random() * 1000));
        if (Math.random() < 0.2) {
            notification.markFailure();
        }
        else {
            notification.markSuccess();
        }
        await this.amqp.publish("app_exchange", "status", {
            mensagemId: notification.id,
            status: notification.status,
        });
        this.logger.log(`📤 ${notification.id} → ${notification.status}`);
        return;
    }
};
exports.CreateNotificationHandler = CreateNotificationHandler;
__decorate([
    (0, nestjs_rabbitmq_1.RabbitSubscribe)({
        exchange: "app_exchange",
        routingKey: "notificar",
        queue: QUEUE_INPUT,
        queueOptions: {
            durable: true,
            autoDelete: false,
            arguments: {
                "x-dead-letter-exchange": "dead_letter_exchange",
                "x-dead-letter-routing-key": "retry",
                "x-max-length": 500,
                "x-message-ttl": 300_000,
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CreateNotificationHandler.prototype, "handle", null);
exports.CreateNotificationHandler = CreateNotificationHandler = CreateNotificationHandler_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_rabbitmq_1.AmqpConnection])
], CreateNotificationHandler);
//# sourceMappingURL=create-notification.handler.js.map