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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingInterceptor = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const operators_1 = require("rxjs/operators");
const uuid_1 = require("uuid");
let LoggingInterceptor = class LoggingInterceptor {
    http;
    logger = new common_1.Logger("HTTP");
    constructor(http) {
        this.http = http;
    }
    intercept(ctx, next) {
        if (ctx.getType() !== "http")
            return next.handle();
        const req = ctx.switchToHttp().getRequest();
        const { method, url } = req;
        const id = (0, uuid_1.v4)();
        const start = Date.now();
        this.logger.log(`→ [${id}] ${method} ${url}`);
        return next.handle().pipe((0, operators_1.tap)({
            next: () => this.after(ctx, id, start, method, url),
            error: (err) => this.after(ctx, id, start, method, url, err),
        }));
    }
    async after(ctx, id, start, method, url, error) {
        const res = ctx.switchToHttp().getResponse();
        const status = res.statusCode;
        const time = Date.now() - start;
        const line = `← [${id}] ${method} ${url} ${status} (${time} ms)`;
        error
            ? this.logger.error(`${line} – ${error.message}`)
            : this.logger.log(line);
        try {
            await this.sendToGrafana(line);
        }
        catch (e) {
        }
    }
    sendToGrafana(msg) {
        const body = {
            streams: [
                {
                    stream: { env: process.env.NODE_ENV ?? "local" },
                    values: [[`${Date.now()}000000`, msg]],
                },
            ],
        };
        return this.http
            .post(process.env.GRAFANA_URL, body, {
            headers: { "Content-Type": "application/json" },
        })
            .toPromise();
    }
};
exports.LoggingInterceptor = LoggingInterceptor;
exports.LoggingInterceptor = LoggingInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], LoggingInterceptor);
//# sourceMappingURL=%20logging.interceptor.js.map