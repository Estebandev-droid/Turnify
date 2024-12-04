import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthFlow from './pages/AuthFlow';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthFlow />} />
      </Routes>
    </Router>
  );
}

export default App;
