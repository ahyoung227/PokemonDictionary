import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from '../_action/user_action';
import { useNavigate } from "react-router-dom";

export default function (SpecificComponent: React.ComponentType, option : boolean, adminRoute = null) {
    
    function AuthenticateCheck() {
        const navigate = useNavigate();
        const dispatch : any = useDispatch()
        useEffect(()=> {
            dispatch(auth()).then((res: { payload: { isAuth: any; isAdmin: any; }; }) => {
                if(!res.payload.isAuth) {
                    if(option) {
                        navigate("/login");
                    }
                //login 한 상태
                } else {
                    if(adminRoute && !res.payload.isAdmin) {
                        navigate("/");
                    } 
                    if(option === false) {
                        navigate("/");
                    }
                }
            });

        }, []);
        return (
            <SpecificComponent />
        )

    }

    return AuthenticateCheck;
}