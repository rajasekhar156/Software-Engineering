import React, {useState} from "react"
import {useNavigate} from 'react-router-dom'
import axios from "axios";

export const Login = (props) =>{
    const [userId,setuserId] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async(e) =>{
        e.preventDefault();
        // const info={userId:userId,password:password};
	    // setDataInput([info]);
        // run();
        let url;
        url = `http://localhost:5001/api/user?userid=${userId}&userpwd=${password}`;
        
        const tp = await axios.post(url);
        console.log(tp.status);
        if(tp.data === "1"){
            navigate('/Home');
        }
        else if(tp.data === "0"){
            alert("OOPS! Invalid Login Details");
        }
    }

    const handleforgotpwd = () => {
        navigate('/Forgotpwd');
    }

    return(
        <div className="auth-form">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label>User Id</label>
                <input value={userId} onChange={(e)=>setuserId(e.target.value)} type='text' placeholder="security3096@iith.ac.in" id='userId'></input>
                <label>Password</label>
                <input value={password} onChange={(e)=>setPassword(e.target.value)} type='password' placeholder="********" id='password'></input>
                <button type="submit">Enter</button>
                <button className="link-btn" onClick={handleforgotpwd}>ForgotPassword</button>
            </form>
        </div>
    )
}