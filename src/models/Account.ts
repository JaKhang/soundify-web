export interface Device {
    id: string;
    ip: string;
    os: string;
    platform: string;
    isCurrent: boolean;
    loginAt: string;  // ISO 8601 date string format
}
