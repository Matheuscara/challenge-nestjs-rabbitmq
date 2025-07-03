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
exports.HealthController = void 0;
const common_1 = require("@nestjs/common");
const throttler_1 = require("@nestjs/throttler");
const swagger_1 = require("@nestjs/swagger");
let HealthController = class HealthController {
    getHealth() {
        return {
            status: "ok",
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            environment: process.env.NODE_ENV || "development",
            service: "challenge-nestjs",
            checks: {
                memory: this.getMemoryUsage(),
                system: this.getSystemInfo(),
            },
        };
    }
    getMemoryUsage() {
        const memUsage = process.memoryUsage();
        return {
            rss: `${memUsage.rss / 1024 / 1024} MB`,
            heapTotal: `${memUsage.heapTotal / 1024 / 1024} MB`,
            heapUsed: `${memUsage.heapUsed / 1024 / 1024} MB`,
            external: `${memUsage.heapUsed / 1024 / 1024} MB`,
        };
    }
    getSystemInfo() {
        return {
            platform: process.platform,
            nodeVersion: process.version,
            cpuArchitecture: process.arch,
        };
    }
};
exports.HealthController = HealthController;
__decorate([
    (0, common_1.Get)(),
    (0, throttler_1.Throttle)({ default: { limit: 100, ttl: 60000 } }),
    (0, swagger_1.ApiOperation)({ summary: "Verificar saúde da aplicação" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HealthController.prototype, "getHealth", null);
exports.HealthController = HealthController = __decorate([
    (0, swagger_1.ApiTags)("health"),
    (0, common_1.Controller)("health")
], HealthController);
//# sourceMappingURL=health.http.js.map