import { HealthTask } from "../data/types";
import { api } from "./axios";
import { ApiResponse, UserInfo } from "./types";

export const updateUserInfo = async (userId: string, userInfo: UserInfo): Promise<ApiResponse> => {
  console.log("userID and userInfo: ", userId, userInfo)
  try {
    const response = await api.put(`/users/user-info/${userId}`, userInfo);
    if (response.status === 200) {
      return {
        success: true,
        message: 'User updated successfully!',
        data: response.data,
        status: response.status,
      };
    } else {
      return {
        success: false,
        message: response.data.error,
      };
    }
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

export const updateDailyTask = async (userId: string, type: string, data: string, setTask: (value: React.SetStateAction<HealthTask[]>) => void): Promise<ApiResponse> => {
  console.log("userID and uploadType: ", userId, type);

  try {
    const response = await api.post('/meals', {
      userId,
      meals: {
        [type]: data
      }
    })

    if (response.status === 201 || response.status === 200) {
      setTask((prevTask) => {
        return [
          {
            ...prevTask[0],
            photo: response.data.meals.breakfast ? response.data.meals.breakfast : ""
          },
          {
            ...prevTask[1],
            photo: response.data.meals.lunch ? response.data.meals.lunch : ""
          },
          {
            ...prevTask[2],
            photo: response.data.meals.dinner ? response.data.meals.dinner : ""
          },
          {
            ...prevTask[3],
            photo: response.data.meals.walking ? response.data.meals.walking : ""
          },
        ]
      })
      return {
        success: true,
        message: "Successfully created or updated the upload info",
        data: response.data
      }
    } else {
      return {
        success: false,
        message: response.data.error
      }
    }
  } catch (error) {
    console.log("Error occured on updateDailyTask --65--: ", error);
    return {
      success: false,
      message: error as string
    }
  }
}

export const getMealInfo = async (userId: string): Promise<ApiResponse> => {
  const dateString = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).replace(/\//g, "-");
  
  console.log("userId and today date string: ", userId, dateString);

  try {
    const response = await api.get(`/meals/${userId}/${dateString}`);

    if (response.status === 200) {
      return {
        success: true,
        message: "Fetching meal info successs",
        data: response.data
      }
    } else {
      return {
        success: false,
        message: response.data.error
      }
    }
  } catch (error) {
    return {
      success: false,
      message:  error as string
    }
  }
}