
import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import AutoHashrouterRedirector from './auto-hashrouter-redirector';
import LoginPage from './pages/login';
import DbCredentialsPage from './pages/db-credentials';
import HomePage from './pages/home';

function App() {
  return (
    <HashRouter>
      <title>Commission Points</title>
      <AutoHashrouterRedirector />
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/db-credentials' element={<DbCredentialsPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
