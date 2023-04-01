import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import {Login} from './Login.jsx';
import { ForgotPassword } from './ForgotPass.jsx';

function App() {
  const [currentform,setCurrentform] = useState('login');

  const toggleForm = (formName) => {
    setCurrentform(formName);
  }

  return (
    <div className="App">
      {
        currentform === 'login' ? <Login onFormSwitch={toggleForm}/> : <ForgotPassword onFormSwitch={toggleForm}/>
      }
    </div>
  );
}

export default App;
