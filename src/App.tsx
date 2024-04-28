import React from 'react';
import logo from './logo.svg';
import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import AutoHashrouterRedirector from './auto-hashrouter-redirector';
import LoginPage from './pages/login';

function App() {
  return (
    <HashRouter>
      <title>Commission Points</title>
      <AutoHashrouterRedirector />
      <Routes>
        <Route path='/' element={<LoginPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
