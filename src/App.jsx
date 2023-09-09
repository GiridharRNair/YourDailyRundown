import React from 'react'
import HomePage from './HomePage'
import ChangePreferences from './ChangePreferences';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/YourDailyRundown" element={<HomePage/>} />
          <Route path="/YourDailyRundown/:uuid" element={<ChangePreferences/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App