import React, {useState} from "react"
// import { run } from "./connect";

export const Login = (props) =>{
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [dataInput, setDataInput]=useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();
        // const info={email:email,password:password};
	    // setDataInput([info]);
        // run();
        console.log(email);
        console.log(password);
    }

    return(
        <div className="auth-form">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label>User Id</label>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} type='email' placeholder="security3096@iith.ac.in" id='email'></input>
                <label>Password</label>
                <input value={password} onChange={(e)=>setPassword(e.target.value)} type='password' placeholder="********" id='password'></input>
                <button type="submit">Enter</button>
                <button className="link-btn" onClick={()=>props.onFormSwitch('forgotpass')}>ForgotPassword</button>
            </form>
        </div>
    )
}