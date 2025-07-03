"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationStatus = void 0;
const domain_error_1 = require("../errors/domain.error");
class NotificationStatus {
    _value;
    constructor(status) {
        this._value = status;
        this.validate();
    }
    static awaiting() {
        return new NotificationStatus("AGUARDANDO_PROCESSAMENTO");
    }
    static success() {
        return new NotificationStatus("PROCESSADO_SUCESSO");
    }
    static failure() {
        return new NotificationStatus("FALHA_PROCESSAMENTO");
    }
    validate() {
        const allowed = [
            "AGUARDANDO_PROCESSAMENTO",
            "PROCESSADO_SUCESSO",
            "FALHA_PROCESSAMENTO",
        ];
        if (!allowed.includes(this._value)) {
            throw new domain_error_1.DomainError(`Status inválido: ${this._value}`);
        }
    }
    get value() {
        return this._value;
    }
}
exports.NotificationStatus = NotificationStatus;
//# sourceMappingURL=notification-status.vo.js.map