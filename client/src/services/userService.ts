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