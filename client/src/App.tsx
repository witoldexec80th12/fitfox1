import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {
  initBackButton,
  initClosingBehavior,
  initHapticFeedback,
  initViewport,
} from "@telegram-apps/sdk";

import "./App.css";

import LandingPage from "./pages/LandingPage/LandingPage";
import TasksPage from "./pages/TasksPage/TasksPage";
import Layout from "./Layout/Layout";
import FriendPage from "./pages/FriendPage/FriendPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import AskPage from "./pages/AskPage/AskPage";
import { AppProvider } from "./context/AppContext";

function App() {
  const [backButton] = initBackButton();
  const [closingBehavior] = initClosingBehavior();
  const hapticFeedback = initHapticFeedback();
  const [viewport] = initViewport();

  useEffect(() => {
    const initApp = async () => {
      backButton.show();
      closingBehavior.enableConfirmation();
      hapticFeedback.notificationOccurred("success");
      const vp = await viewport;

      if (!vp.isExpanded) {
        vp.expand(); // will expand the Mini App, if it's not
      }
    };

    initApp();
  });

  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* Home route without Layout */}
          <Route path="/" element={<LandingPage />} />

          {/* Other routes wrapped with Layout */}
          <Route element={<Layout />}>
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/ask" element={<AskPage />} />
            <Route path="/friends" element={<FriendPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
