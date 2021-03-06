import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import baseUrl from '../baseUrl';

function Resetpassword() {

    let { id, token } = useParams();

    const navigate = useNavigate();

    const [newPassword, setnewPassword] = useState('');
    const [cnewPassword, setcNewPassword] = useState('');




    useEffect(() => {
        axios.get(`${baseUrl.baseUrl}/auth/reset-password/${id}/${token}`).then((response) => {

            if (response.data.error) {
                alert(response.data.error);
                navigate('/login')
            }

        })
    }, [])


    const resetpassword = () => {
        console.log(newPassword);
        axios.put(`${baseUrl.baseUrl}/auth/reset-password`, { newPassword, id },).then((response) => {
            console.log(response.data)
            navigate('/login')
        })
    }


    return (
        <>
            <div className='border shadow-md md:w-2/6 mx-5 md:mx-auto text-center p-5'>
                <h1 className='font-bold text-2xl'>Reset Password</h1>

                <div className='mt-8'>
                    <input type="password" placeholder='old password' className='py-4 w-full border px-2' onChange={(event) => { setnewPassword(event.target.value) }}></input>
                    <input type="password" placeholder='new password' className='py-4 w-full border px-2' onChange={(event) => { setcNewPassword(event.target.value) }}></input>
                    <button type='submit' className='bg-yellow-600 text-white font-bold px-4 py-3' onClick={resetpassword}>SUBMIT</button>
                </div>
            </div>

        </>
    )
}

export default Resetpassword