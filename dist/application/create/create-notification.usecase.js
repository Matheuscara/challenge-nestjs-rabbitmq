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
var CreateNotificationUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateNotificationUseCase = void 0;
const common_1 = require("@nestjs/common");
const nestjs_rabbitmq_1 = require("@golevelup/nestjs-rabbitmq");
let CreateNotificationUseCase = CreateNotificationUseCase_1 = class CreateNotificationUseCase {
    amqp;
    logger = new common_1.Logger(CreateNotificationUseCase_1.name);
    constructor(amqp) {
        this.amqp = amqp;
    }
    async execute(dto) {
        this.logger.log(`📩 Publicando notificação ${dto.mensagemId}`);
        await this.amqp.publish("app_exchange", "notificar", {
            mensagemId: dto.mensagemId,
            conteudoMensagem: dto.conteudoMensagem,
        });
        this.logger.log(`✅ Notificação ${dto.mensagemId} publicada.`);
        return dto.mensagemId;
    }
};
exports.CreateNotificationUseCase = CreateNotificationUseCase;
exports.CreateNotificationUseCase = CreateNotificationUseCase = CreateNotificationUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_rabbitmq_1.AmqpConnection])
], CreateNotificationUseCase);
//# sourceMappingURL=create-notification.usecase.js.map