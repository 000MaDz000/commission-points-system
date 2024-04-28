import React from 'react';
import logo from './logo.svg';
import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import AutoHashrouterRedirector from './auto-hashrouter-redirector';

function App() {
  return (
    <HashRouter>
      <AutoHashrouterRedirector />
      <Routes>
        <Route path='/' element={<h1>hello world</h1>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
