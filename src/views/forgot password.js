import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import baseUrl from '../baseUrl';

function Forgotpassword() {

    const [email, setEMail] = useState('');
    const [msg, setMsg] = useState("");


    const Forgotpassword = () => {
        axios.post(`${baseUrl.baseUrl}/auth/resetpassword`, {email}
        ).then((response) => {
            setMsg(response.data)
        }).catch((err) => {
            console.log(err)
        })
    }


    return (
        <>
            <div className='px-6'>
                <h1 className='font-bold text-2xl'> Forgort Password</h1>

                <div className='mt-8'>
                    <input type="email" placeholder='input your email' className='py-4  border mx-4 px-2' onChange={(event) => {setEMail(event.target.value)}}></input>
                    <button type='submit' className='bg-yellow-600 text-white font-bold px-4 py-3' onClick={Forgotpassword}>SUBMIT</button>
                </div>

                <div className='border border-red-500 bg-slate-50 px-5 py-6'>
                    {msg}
                </div>

                
            </div>

        </>
    )
}

export default Forgotpassword