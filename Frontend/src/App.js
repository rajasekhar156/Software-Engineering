import './App.css';
import {Login} from './Pages/LoginPage/Login';
import {Homepage} from "./Pages/HomePage/Homepage";
import {ForgotPassword} from './Pages/ForgotPwdPage/ForgotPwd';
import { Search } from './Pages/SearchPage/SearchPage';
import {Add} from './Pages/AddPage/AddPage'
import {ActiveEntries} from './Pages/ActiveEntriesPage/ActiveEntriesPage'
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <main className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element = {<Login />} />
          <Route path="/Forgotpwd" element = {<ForgotPassword />} />
          <Route path="/Home" element = {<Homepage />} />
          <Route path="/Add" element = {<Add />} />
          <Route path="/Search" element = {<Search />} />
          <Route path="/ActiveEntries" element = {<ActiveEntries />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
