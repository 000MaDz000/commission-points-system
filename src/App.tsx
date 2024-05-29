
import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import AutoHashrouterRedirector from './auto-hashrouter-redirector';
import LoginPage from './pages/login';
import DbCredentialsPage from './pages/db-credentials';
import HomePage from './pages/home';
import CardsPage from './pages/cards-page';
import { useIntl } from 'react-intl';
import PersonPage from './pages/person';
import PeaplePage from './pages/peaple';
import SettingsPage from './pages/settings';

function App() {

  return (
    <HashRouter >
      <title>Commission Points</title>
      <AutoHashrouterRedirector />
      <div className="App">
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/peaple' element={<PeaplePage />} />
          <Route path='/settings' element={<SettingsPage />} />
          <Route path='/db-credentials' element={<DbCredentialsPage />} />
          <Route path='/cards/:cardId' element={<CardsPage />} />
          <Route path="/person/:id" element={<PersonPage />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
