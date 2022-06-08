import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

export const Errorpage = () => {
    return (
        <Fragment>
            <div className=" w-2/3 p-10 h-1/3 mx-auto animate-bounce shadow-lg mt-32">
                <h1 className="text-2xl font-bold text-center text-red-500">The page you are looking for doesnot exist</h1>
            </div>

            <div className='mx-auto w-96 mt-5'>
                <Link to="/" className="text-center ">
                    <button className="bg-indigo-700 text-white w-96 p-5 px-10 rounded-full ">
                        Homepage
                    </button>

                </Link>
            </div>


        </Fragment>
    )
}

