import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import baseUrl from '../baseUrl';

function Forgotpassword() {

    const [email, setEMail] = useState('');
    const [msg, setMsg] = useState("");
    const [check, setCheck] = useState(false);


    const Forgotpassword = () => {
        axios.post(`${baseUrl.baseUrl}/auth/resetpassword`, { email }
        ).then((response) => {
            setMsg(response.data);
            setTimeout(() => {
                setCheck(true)
            }, 2000)
        }).catch((err) => {
            console.log(err)
            setMsg(err)
        })
    }


    return (
        <>
            <div className='border shadow-md w-2/6 mx-auto text-center p-5'>
                <h1 className='font-bold text-2xl'> Forgort Password</h1>

                <div className='mt-8 space-y-4'>
                    <input type="email" placeholder='input your email' className='py-4 w-full border px-2' onChange={(event) => { setEMail(event.target.value) }}></input>
                    <button type='submit' className='bg-yellow-600 text-white font-bold px-4 py-3' onClick={Forgotpassword}>SUBMIT</button>
                </div>

                {
                    check && (<div className='border rounded-xl border-red-500 bg-slate-50 px-5 py-6 mt-5'>
                        {msg}
                    </div>)
                }



            </div>

        </>
    )
}

export default Forgotpassword