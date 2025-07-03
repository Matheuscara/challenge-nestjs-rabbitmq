"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rabbitMqConfig = void 0;
const config_1 = require("@nestjs/config");
exports.rabbitMqConfig = {
    imports: [config_1.ConfigModule],
    inject: [config_1.ConfigService],
    useFactory: (config) => ({
        uri: config.get("RABBITMQ_URL"),
        prefetchCount: 5,
        connectionInitOptions: {
            wait: true,
            timeout: 5000,
            reject: true,
        },
        enableControllerDiscovery: true,
        exchanges: [
            {
                name: "app_exchange",
                type: "direct",
            },
            {
                name: "dead_letter_exchange",
                type: "direct",
            },
        ],
    }),
};
//# sourceMappingURL=config.js.map