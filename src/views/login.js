import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

//to have access to the context API
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";



export const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate();

    const {setAuthState, setUser} = useContext(AuthContext);  //to be able to set the value for AuthState  from the function setAuthState using the useContext passing Authcontext



    const login = () => {
        const data = {
            username: username,
            password: password
        }
        //handling post request with axios, to submit the data  from the form to the database  the  api **** your pass data (i.e details from the form) as the second arguement which is the req.body in backend api
        axios.post("http://localhost:3001/auth/login", data).then((response) => {

            //if there is an error in login from response {i.e if there is a value for error sent from backend response}, then alert the error
            if (response.data.error) {
                alert(response.data.error);
            } else {
                //else if there is no error value, just the JWT sent from backend, then we save the JWT in the sessionStorage
                localStorage.setItem("JWT", response.data.token);
                setAuthState(true); //set authSTate to true, indicating that the user has been logged in
                setUser(response.data);
                navigate('/');
            }

        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <>
            <div className="shadow w-96 p-5 text-center mx-auto">
                <p className="text-xl py-5 font-medium">Login</p>

                <div>
                    <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} className="w-full h-12 px-3 py-2 my-1 rounded-lg border-0 shadow-sm focus:outline-none focus:border-indigo-700 bg-slate-100 text-base" />
                    <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} className="w-full h-12 px-3 py-2 my-1 rounded-lg border-0 shadow-sm focus:outline-none focus:border-indigo-700 bg-slate-100 text-base" />

                    <button className="w-full px-3 py-4 bg-yellow-700 text-white font-medium mt-6 rounded-lg" onClick={login} disabled={username === "" || password === ""}>Login</button>
                </div>

                    <Link to="/reset-password" className="w-full px-3 py-4 bg-yellow-700 text-white font-medium mt-6 rounded-lg"  >Forgot Password</Link>
            </div>
        </>
    )
}