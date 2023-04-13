import './App.css';
import {Login} from './Pages/LoginPage/Login';
import {Homepage} from "./Pages/HomePage/Homepage";
import {ForgotPassword} from './Pages/ForgotPwdPage/ForgotPwd';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <main className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element = {<Login />} />
          <Route path="/Forgotpwd" element = {<ForgotPassword />} />
          <Route path="/Home" element = {<Homepage />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
