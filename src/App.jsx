import React from 'react'
import HomePage from './pages/HomePage'
import Unsubscribe from './pages/Unsubscribe';
import ChangePreferences from './pages/ChangePreferences';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/YourDailyRundown/" element={<HomePage />} />
          <Route path="/YourDailyRundown/:uuid" element={<ChangePreferences />} />
          <Route path="/YourDailyRundown/:uuid/unsubscribe" element={<Unsubscribe />} />
        </Routes>
      </Router>
    </>
  )
}

export default App