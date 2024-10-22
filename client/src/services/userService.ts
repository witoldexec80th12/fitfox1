import { api } from "./axios";
import { ApiResponse } from "./types";

export const getUser = async (userId: string): Promise<ApiResponse> => {
    try {
        const response = await api.get(`/users/${userId}`);
        return {
            success: true,
            message: 'Successfully fetch user data.',
            data: response.data,
            status: response.status,
        };
    } catch (error: any) {
        console.log(error);
        if (error.response) {
            return {
                success: false,
                message: error.response.data.error,
                status: error.response.status,
            };
        } else {
            // General error case
            return {
                success: false,
                message: error,
            };
        }
    }
}

export const updateUser = async (userId: string, data: any): Promise<ApiResponse> => {
    try {
        const response = await api.put(`/users/${userId}`, {...data});
        if (response.status === 200) {
            return {
                success: true,
                message: "Successfully updated User",
                data: response.data
            }
        } else {
            return {
                success: false,
                message: response.data.error
            }
        }
    } catch (error: any) {
        console.log(error);
        if (error.response) {
            return {
                success: false,
                message: error.response.data.error,
                status: error.response.status,
            };
        } else {
            // General error case
            return {
                success: false,
                message: error,
            };
        }
    }
}

export const addMaillist = async (userId: string, email: string): Promise<ApiResponse> => {
    try {
        const response = await api.post(`/mails`, {userId, email});

        if (response.status === 201) {
            return {
                success: true,
                message: response.data.message
            }
        } else {
            return {
                success: false,
                message: response.data.error
            }
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: error as string
        }
    }
}