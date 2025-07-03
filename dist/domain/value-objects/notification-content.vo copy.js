"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationContent = void 0;
const domain_error_1 = require("../errors/domain.error");
class NotificationContent {
    _value;
    constructor(content) {
        this._value = content.trim();
        this.validate();
    }
    static create(content) {
        return new NotificationContent(content);
    }
    validate() {
        if (this._value.length === 0) {
            throw new domain_error_1.DomainError("Conteúdo da notificação não pode ser vazio.");
        }
        if (this._value.length > 500) {
            throw new domain_error_1.DomainError("Conteúdo da notificação não pode exceder 500 caracteres.");
        }
    }
    get value() {
        return this._value;
    }
}
exports.NotificationContent = NotificationContent;
//# sourceMappingURL=notification-content.vo%20copy.js.map