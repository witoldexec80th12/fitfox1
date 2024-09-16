import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { initBackButton, initClosingBehavior, initHapticFeedback, initViewport } from '@telegram-apps/sdk';

import './App.css'
import LandingPage from './pages/LandingPage/LandingPage';
import TasksPage from './pages/TasksPage/TasksPage';
import Layout from './Layout/Layout';

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
        {/* Home route without Layout */}
        <Route path='/' element={<LandingPage />} />

        {/* Other routes wrapped with Layout */}
        <Route element={<Layout />}>
          <Route path='/tasks' element={<TasksPage />} />
          {/* Add more routes here */}
        </Route>
      </Routes>
    </Router>
  )
}

export default App
