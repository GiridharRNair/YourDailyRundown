import React from 'react'
import HomePage from './pages/HomePage'
import Unsubscribe from './pages/Unsubscribe';
import PageNotFound from './pages/PageNotFound';
import ChangePreferences from './pages/ChangePreferences';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:uuid" element={<ChangePreferences />} />
          <Route path="/:uuid/unsubscribe" element={<Unsubscribe />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default App