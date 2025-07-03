"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationId = void 0;
const crypto_1 = require("crypto");
const class_validator_1 = require("class-validator");
const domain_error_1 = require("../errors/domain.error");
class NotificationId {
    _value;
    constructor(id) {
        this._value = id;
        this.validate();
    }
    static create(id) {
        return new NotificationId(id ?? (0, crypto_1.randomUUID)());
    }
    validate() {
        if (!(0, class_validator_1.isUUID)(this._value)) {
            throw new domain_error_1.DomainError("ID de notificação inválido. Deve ser um UUID.");
        }
    }
    get value() {
        return this._value;
    }
}
exports.NotificationId = NotificationId;
//# sourceMappingURL=notification-id.vo.js.map