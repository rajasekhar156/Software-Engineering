import { useState } from 'react';
import './App.css';
import {Login} from './Login.jsx';
import {Homepage} from "../src/Homepage";
import { ForgotPassword } from './ForgotPass.jsx';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  const [currentform,setCurrentform] = useState('login');

  const toggleForm = (formName) => {
    setCurrentform(formName);
  }

  return (
    // <div className="App">
    //   {
    //     currentform === 'login' ? <Login onFormSwitch={toggleForm}/> : <ForgotPassword onFormSwitch={toggleForm}/>
    //   }
    // </div>
    <main className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element = {<Homepage />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
