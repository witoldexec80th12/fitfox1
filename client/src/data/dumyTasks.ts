import { HealthTask, NewTask, PointHistory, UserInfo } from "./types";

import { breakfast, lunch, dinner, walk } from "../assets/images";
import { ContactIcon, KeyIcon, LabIcon, TelegramIcon } from "./Icons";

export const healthTasks: HealthTask[] = [
  {
    icon: breakfast,
    title: "Breakfast",
    totalNumber: 20,
  },
  {
    icon: lunch,
    title: "Lunch",
    totalNumber: 20,
  },
  {
    icon: dinner,
    title: "Dinner",
    totalNumber: 10,
  },
  {
    icon: walk,
    title: "Walking",
    totalNumber: 0,
  },
];

export const newTasks: NewTask[] = [
  {
    title: "Create Account",
    reward: 500,
  },
  {
    title: "Ask a question to our Chatbot",
    reward: 10,
  },
  {
    title: "Join Mailing List",
    reward: 50,
  },
];

export const userInfos: UserInfo[] = [
  {
    icon: TelegramIcon,
    title: "Telegram Group",
  },
  {
    icon: ContactIcon,
    title: "Your STEPN User ID",
  },
  {
    icon: KeyIcon,
    title: "Your STEPN Password",
  },
  {
    icon: LabIcon,
    title: "Your Lab Data",
  },
];

export const pointHistories: PointHistory[] = [
  {
    title: "Hold coin bonus",
    date: new Date().toLocaleDateString("en-GB", {
      day: "2-digit", // 03
      month: "short", // Sep
      year: "numeric", // 2024
    }),
    point: 100,
  },
  {
    title: "Hold coin bonus",
    date: new Date().toLocaleDateString("en-GB", {
      day: "2-digit", // 03
      month: "short", // Sep
      year: "numeric", // 2024
    }),
    point: 100,
  },
  {
    title: "Hold coin bonus",
    date: new Date().toLocaleDateString("en-GB", {
      day: "2-digit", // 03
      month: "short", // Sep
      year: "numeric", // 2024
    }),
    point: 100,
  },
  {
    title: "Hold coin bonus",
    date: new Date().toLocaleDateString("en-GB", {
      day: "2-digit", // 03
      month: "short", // Sep
      year: "numeric", // 2024
    }),
    point: 100,
  },
];
