"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const Joi = require("joi");
const nestjs_pino_1 = require("nestjs-pino");
let LoggerModule = class LoggerModule {
};
exports.LoggerModule = LoggerModule;
exports.LoggerModule = LoggerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                validationSchema: Joi.object({
                    LOG_TYPE: Joi.string().default('pino-pretty'),
                    LOG_LEVEL: Joi.string().default('info'),
                }),
            }),
            nestjs_pino_1.LoggerModule.forRootAsync({
                useFactory: (configService) => {
                    const logLevel = configService.get('LOG_LEVEL') || 'info';
                    const logType = configService.get('LOG_TYPE') || 'pino-pretty';
                    if (logType === 'pino-pretty') {
                        return {
                            pinoHttp: {
                                customProps: (_req, _res) => ({
                                    context: 'HTTP',
                                }),
                                level: logLevel,
                                transport: {
                                    target: 'pino-pretty',
                                    options: {
                                        colorize: true,
                                        singleLine: false,
                                        ignore: 'req,res,headers',
                                    },
                                },
                            },
                        };
                    }
                    return {
                        pinoHttp: {
                            customProps: (_req, _res) => ({
                                context: 'HTTP',
                            }),
                            level: logLevel,
                        },
                    };
                },
                inject: [config_1.ConfigService],
            }),
        ],
    })
], LoggerModule);
//# sourceMappingURL=logger.module.js.map