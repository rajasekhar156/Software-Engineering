import React, {useState} from "react"

export const ForgotPassword = (props) =>{
    const [email,setEmail] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(email);
    }

    return(
        <div className="auth-form">
            <form className="forgotpass-form" onSubmit={handleSubmit}>
                <label>Email</label>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} type='email' placeholder="security3096@iith.ac.in" id='email'></input>
                <button type='button'>Enter</button>
                <button className="link-btn" onClick={()=>props.onFormSwitch('login')}>Login</button>
            </form>
        </div>
    )
}