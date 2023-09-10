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
          <Route path="/" element={<HomePage />} />
          <Route path="/:uuid" element={<ChangePreferences />} />
          <Route path="/:uuid/unsubscribe" element={<Unsubscribe />} />
        </Routes>
      </Router>
    </>
  )
}

export default App