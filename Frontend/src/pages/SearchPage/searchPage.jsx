import React, { useState } from "react"
// import { run } from "./connect";
import axios from "axios";

export const Search = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dataInput, setDataInput] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const info={email:email,password:password};
        // setDataInput([info]);
        // run();
        let url;
        url = `http://localhost:5001/api/user?userid=${email}&userpwd=${password}`;

        const tp = await axios.post(url);
        console.log(email);
        console.log(password);
    }

    const searchVehicle = async (vehicleNumberSc) => {
        let url;
        url = `http://localhost:5001/api/info?vehicleNumber=${vehicleNumberSc}`;
        const res = await axios.get(url);
        setStudents(res.data);
    };

    return (
        <div className="auth-form">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label>User Id</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder="security3096@iith.ac.in" id='email'></input>
                <label>Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder="********" id='password'></input>
                <button type="submit">Enter</button>
                <button className="link-btn" onClick={() => props.onFormSwitch('forgotpass')}>ForgotPassword</button>
            </form>
        </div>
    )
}