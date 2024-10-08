import { HealthTask, NewTask, PointHistory, UserInfo } from "./types";

import { BreakFastIcon, ContactIcon, DinnerIcon, KeyIcon, LabIcon, LunchIcon, TelegramIcon, WalkingIcon } from "../utils/Icons";
import { BreakfastTooltip, DinnerTooltip, LunchTooltip, WalkingTooltip } from "../utils/Tooltips";

export const healthTasks: HealthTask[] = [
  {
    icon: BreakFastIcon,
    photo: "",
    title: "Breakfast",
    totalNumber: 20,
    performed: false,
    tooltip: BreakfastTooltip
  },
  {
    icon: LunchIcon,
    photo: "",
    title: "Lunch",
    totalNumber: 20,
    performed: false,
    tooltip: LunchTooltip
  },
  {
    icon: DinnerIcon,
    photo: "",
    title: "Dinner",
    totalNumber: 10,
    performed: false,
    tooltip: DinnerTooltip
  },
  {
    icon: WalkingIcon,
    photo: "",
    title: "Walking",
    totalNumber: 0,
    performed: false,
    tooltip: WalkingTooltip
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
