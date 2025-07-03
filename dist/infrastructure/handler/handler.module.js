"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandlerModule = void 0;
const common_1 = require("@nestjs/common");
const create_notification_handler_1 = require("./create-notification.handler");
const message_broker_1 = require("../message-broker");
const create_status_notification_handler_1 = require("./create-status-notification.handler");
const gateway_module_1 = require("../gateway/gateway.module");
let HandlerModule = class HandlerModule {
};
exports.HandlerModule = HandlerModule;
exports.HandlerModule = HandlerModule = __decorate([
    (0, common_1.Module)({
        imports: [message_broker_1.CustomRabbitMQModule, gateway_module_1.GatewayModule],
        providers: [create_notification_handler_1.CreateNotificationHandler, create_status_notification_handler_1.CreateStatusNotificationHandler],
        exports: [create_notification_handler_1.CreateNotificationHandler, create_status_notification_handler_1.CreateStatusNotificationHandler],
    })
], HandlerModule);
//# sourceMappingURL=handler.module.js.map