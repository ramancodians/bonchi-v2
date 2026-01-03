export declare const AuthType: {
    readonly EMAIL_PASSWORD: "EMAIL_PASSWORD";
    readonly SMS_OTP: "SMS_OTP";
};
export type AuthType = (typeof AuthType)[keyof typeof AuthType];
export declare const Gender: {
    readonly MALE: "MALE";
    readonly FEMALE: "FEMALE";
    readonly OTHER: "OTHER";
    readonly PREFER_NOT_TO_SAY: "PREFER_NOT_TO_SAY";
};
export type Gender = (typeof Gender)[keyof typeof Gender];
export declare const USER_TYPES: {
    readonly SUPER_ADMIN: "SUPER_ADMIN";
    readonly CUSTOMER: "CUSTOMER";
    readonly HEALTH_CARE_PROVIDER: "HEALTH_CARE_PROVIDER";
    readonly BONCHI_MITRA: "BONCHI_MITRA";
    readonly AMBULANCE_SERVICE: "AMBULANCE_SERVICE";
};
export type USER_TYPES = (typeof USER_TYPES)[keyof typeof USER_TYPES];
export declare const AGENT_TYPE: {
    readonly LOCAL: "LOCAL";
    readonly DISTRICT: "DISTRICT";
    readonly STATE: "STATE";
};
export type AGENT_TYPE = (typeof AGENT_TYPE)[keyof typeof AGENT_TYPE];
