
import { api } from "./axios";
import { ApiResponse, UserInfo } from "./types";

export const updateUserInfo = async (userId: string, userInfo: UserInfo): Promise<ApiResponse> => {
  console.log("userID and userInfo: ", userId, userInfo)
    try {
        const response = await api.put(`/users/user-info/${userId}`, userInfo);
        return {
            success: true,
            message: 'User updated successfully!',
            data: response.data,
            status: response.status,
          };
    } catch (error: any) {
        if (error.response) {
            // If the error has a response (e.g., 404 or validation failure)
            return {
              success: false,
              message: error.response.data.error,
              status: error.response.status,
            };
          } else {
            // General error case
            console.log(error);
            return {
              success: false,
              message: error,
            };
          }
    }
}