export declare class HealthController {
    getHealth(): {
        status: string;
        timestamp: string;
        uptime: number;
        environment: string;
        service: string;
        checks: {
            memory: {
                rss: string;
                heapTotal: string;
                heapUsed: string;
                external: string;
            };
            system: {
                platform: NodeJS.Platform;
                nodeVersion: string;
                cpuArchitecture: NodeJS.Architecture;
            };
        };
    };
    private getMemoryUsage;
    private getSystemInfo;
}
