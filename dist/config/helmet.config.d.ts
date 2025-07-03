export declare const getHelmetConfig: () => {
    contentSecurityPolicy: {
        directives: {
            defaultSrc: string[];
            styleSrc: string[];
            scriptSrc: string[];
            imgSrc: string[];
            fontSrc: string[];
            connectSrc: string[];
            frameSrc: string[];
            objectSrc: string[];
            mediaSrc: string[];
            manifestSrc: string[];
        };
    };
    crossOriginEmbedderPolicy: boolean;
    crossOriginResourcePolicy: {
        policy: "cross-origin";
    };
    dnsPrefetchControl: {
        allow: boolean;
    };
    frameguard: {
        action: "deny";
    };
    hidePoweredBy: boolean;
    hsts: boolean | {
        maxAge: number;
        includeSubDomains: boolean;
        preload: boolean;
    };
    ieNoOpen: boolean;
    noSniff: boolean;
    originAgentCluster: boolean;
    permittedCrossDomainPolicies: boolean;
    referrerPolicy: {
        policy: "no-referrer";
    };
    xssFilter: boolean;
};
export declare const securityHeaders: {
    'X-API-Version': string;
    'X-Content-Type-Options': string;
    'X-Frame-Options': string;
    'X-XSS-Protection': string;
    'Cache-Control': string;
    Pragma: string;
    Expires: string;
};
