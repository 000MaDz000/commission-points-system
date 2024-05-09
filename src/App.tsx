
import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import AutoHashrouterRedirector from './auto-hashrouter-redirector';
import LoginPage from './pages/login';
import DbCredentialsPage from './pages/db-credentials';
import HomePage from './pages/home';
import CardsPage from './pages/cards-page';
import { useIntl } from 'react-intl';

function App() {
  const intl = useIntl();

  return (
    <HashRouter >
      <title>Commission Points</title>
      <AutoHashrouterRedirector />
      <div className="App" dir={intl.locale === "ar" ? "rtl" : "ltr"}>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/db-credentials' element={<DbCredentialsPage />} />
          <Route path='/cards/:cardId' element={<CardsPage />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
