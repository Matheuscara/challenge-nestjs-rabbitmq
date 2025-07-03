import { NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
export declare class LoggingInterceptor implements NestInterceptor {
    private readonly http;
    private readonly logger;
    constructor(http: HttpService);
    intercept(ctx: ExecutionContext, next: CallHandler): import("rxjs").Observable<any>;
    private after;
    private sendToGrafana;
}
