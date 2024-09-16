import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { initBackButton, initClosingBehavior, initHapticFeedback, initViewport } from '@telegram-apps/sdk';

import './App.css'
import LandingPage from './pages/LandingPage/LandingPage';
import TasksPage from './pages/TasksPage/TasksPage';
import BottomNavbar from './components/BottomNavbar/BottomNavbar';

function App() {

  const [backButton] = initBackButton();
  const [closingBehavior] = initClosingBehavior();
  const hapticFeedback = initHapticFeedback();
  const [viewport] = initViewport();

  useEffect(() => {
    const initApp = async () => {
      backButton.show();
      closingBehavior.enableConfirmation();
      hapticFeedback.notificationOccurred('success');
      const vp = await viewport;

      if (!vp.isExpanded) {
        vp.expand(); // will expand the Mini App, if it's not
      }
    }

    initApp();
  })

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/tasks' element={<TasksPage />} />
      </Routes>
      <BottomNavbar />
    </Router>
  )
}

export default App
