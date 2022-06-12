import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import baseUrl from '../baseUrl';

function Changepassword() {

    const navigate = useNavigate();

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');


    const Changepassword = () => {
        axios.put(`${baseUrl.baseUrl}/auth/changepassword`, {oldPassword, newPassword},
            {headers:{ accessToken: localStorage.getItem("JWT") } }
        ).then((response) => {
            if(response.data.error){
                alert(response.data.error);
            }else{
                alert("Changes Saved")
                navigate('/')
            }
        })
    }


    return (
        <>
            <div className='border shadow-md w-2/6 mx-auto text-center p-5'>
                <h1 className='font-bold text-2xl'>Change Password</h1>

                <div className='mt-8 space-y-4'>
                    <input type="password" placeholder='old password' className='py-4 w-full border px-2' onChange={(event) => {setOldPassword(event.target.value)}}></input>
                    <input type="password" placeholder='new password' className='py-4 w-full border px-2' onChange={(event) => {setNewPassword(event.target.value)}}></input>
                    <button type='submit' className='bg-yellow-600 text-white font-bold px-4 py-3' onClick={Changepassword}>SAVE CHANGES</button>
                </div>
            </div>

        </>
    )
}

export default Changepassword