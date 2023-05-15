import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_action/user_action";
import { useNavigate } from "react-router-dom";
import Auth from "../../../hoc/auth";

function LoginPage() {
    const dispatch:any  = useDispatch();
    const navigate = useNavigate();
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const onEmailHandler = (event : React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.currentTarget.value);
    }

    const onPasswordHandler = (event : React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value);
    }

    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement> ) => {
        event.preventDefault();
        
        const body = {
            email: email,
            password: password
        }
        dispatch(loginUser(body))
            .then((res: { payload: { loginSuccess: any; }; }) => {
                console.log("login request has been sent");
                if(res.payload.loginSuccess) {
                    navigate("/pokemon");
                } else {
                    alert("error")
                }
            });
    }

    const handleOnclick = (e: React.MouseEvent<HTMLButtonElement>) => {
        navigate("/register");
    }

    return (
        <>
        <p>Welcome to Pokemon Dictionary. Please login to search Pokemon</p>
            <div style={{
                display: 'flex', justifyContent: 'center', 
                 width: '100%', height: '100vh'
            }}>
                <div>
                    <form onSubmit={onSubmitHandler} style={{display: 'flex', flexDirection: 'column' }}>
                        <label>Email</label>
                        <input type="email" value={email} onChange={onEmailHandler} />
                        <label>Password</label>
                        <input type="password" value={password} onChange={onPasswordHandler} />

                        <br></br>
                        <button type = "submit">Login</button>
                        
                    </form>
                    <div>
                        <p>New user?</p>
                        <button onClick={handleOnclick} style ={{ width:"4rem"}}>Register</button>
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default Auth(LoginPage, false)
