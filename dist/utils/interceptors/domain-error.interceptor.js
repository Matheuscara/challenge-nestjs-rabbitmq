"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainErrorInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const response_messages_1 = require("../constants/response-messages");
const domain_error_1 = require("../../domain/errors/domain.error");
let DomainErrorInterceptor = class DomainErrorInterceptor {
    intercept(_context, next) {
        return next.handle().pipe((0, operators_1.catchError)((err) => {
            if (err instanceof domain_error_1.DomainError) {
                return (0, rxjs_1.throwError)(() => new common_1.UnprocessableEntityException(response_messages_1.ResponseMessages.RULE_ENTITY_NOT_CORRECT));
            }
            return (0, rxjs_1.throwError)(() => err);
        }));
    }
};
exports.DomainErrorInterceptor = DomainErrorInterceptor;
exports.DomainErrorInterceptor = DomainErrorInterceptor = __decorate([
    (0, common_1.Injectable)()
], DomainErrorInterceptor);
//# sourceMappingURL=domain-error.interceptor.js.map