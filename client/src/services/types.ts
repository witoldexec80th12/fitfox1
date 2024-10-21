export interface UserInfo {
    tgGroupId?: string;
    stepnId?: string;
    stepnPassword?: string;
    labData?: string;
    accessCode?: string;
}

export interface ApiResponse {
    success: boolean;
    message: string;
    data?: any;
    status?: number;
}