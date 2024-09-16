import { HealthTask, NewTask } from "./types";

import {breakfast, lunch, dinner, walk} from "../assets/images";

export const healthTasks: HealthTask[] = [
    {
        icon: breakfast,
        title: "Breakfast",
        totalNumber: 20
    },
    {
        icon: lunch,
        title: "Lunch",
        totalNumber: 20
    },
    {
        icon: dinner,
        title: "Dinner",
        totalNumber: 10
    },
    {
        icon: walk,
        title: "Walking",
        totalNumber: 0
    }
]

export const newTasks: NewTask[] = [
    {
        title: "Create Account",
        reward: 500
    },
    {
        title: "Ask a question to our Chatbot",
        reward: 10
    },
    {
        title: "Join Mailing List",
        reward: 50
    }
]