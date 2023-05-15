import React, { useState } from 'react';
import {useDispatch} from "react-redux";
import { registerUser } from "../../../_action/user_action";
import { useNavigate } from "react-router-dom";
import Auth from "../../../hoc/auth";

function RegisterPage() {
    const dispatch :any = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const onEmailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.currentTarget.value);
    }

    const onPasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value);
    }

    const onNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.currentTarget.value);
    }

    const onConfirmPasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.currentTarget.value);
    }

    const onSubmitHandler = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(password !== confirmPassword) {
            return alert("Password and confirmation password has to be identical");
        }
        
        const body = {
            email: email,
            name: name,
            password: password
        }

        dispatch(registerUser(body))
            .then((res: { payload: { success: any; }; }) => {
                if(res.payload.success) {
                    navigate("/pokemon");
                } else {
                    alert("failed to sign up")
                }
            });
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', 
            alignItems: 'center', width: '100%', height: '100vh'
        }}>
           <form style={{display: 'flex', flexDirection: 'column' }} onSubmit={onSubmitHandler}>
            <label>Email</label>
            <input type="email" value={email} onChange={onEmailHandler} />
            <label>Name</label>
            <input type="name" value={name} onChange={onNameHandler} />
            <label>Password</label>
            <input type="password" value={password} onChange={onPasswordHandler} />
            <label>Confirm Password</label>
            <input type="password" value={confirmPassword} onChange={onConfirmPasswordHandler} />

            <br></br>
            <button type = "submit">Register</button>
           </form>
        </div>
    )
}

export default Auth(RegisterPage, false)
