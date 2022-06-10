import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'



export const Navbar = () => {

    const navigate = useNavigate();

    let { user, setUser, authState, setAuthState } = useContext(AuthContext); // to access to the user, setAuthState, authState from the context API
    const [isOpen, setIsOpen] = useState(true);


    const Navbar = () => {
        setIsOpen(!isOpen)
    }


    //to Logout uses
    const logout = () => {
        localStorage.removeItem("JWT")
        setAuthState(false);
        setUser({
            username: "",
            id: 0
        })
        navigate('/');
        setIsOpen(!isOpen);
    }




    return (
        <>

            <div className=' flex flex-wrap bg-slate-50 justify-between fixed w-full shadow-md h-20 px-8 lg:px-24 items-center z-10'>
                <div className='font-bold text-2xl'> BLOGS </div>

                {authState && (  //if logged in show this buh dont show it if not logged in
                    <div className='bg-slate-200 py-4 px-8 rounded-md'>
                        <p className="text-gray-400"> Logged in as:  <span className="text-black font-medium"> {user.username} </span>  </p>
                    </div>
                )}

                <div className=''>
                    <div>
                        <div className='font-black lg:hidden' onClick={Navbar}> ||| </div>
                        {/* <button className='bg-slate-500 text-white' onClick={Navbar}>GO</button> */}
                    </div>

                    <div className={`h-50 shadow-lg items-center rounded-lg lg:shadow-none lg:bg-inherit py-4 px-6 bg-white text-right w-52 lg:w-full mt-8 lg:mt-0 transition duration-300 ease-in-out absolute lg:relative lg:translate-x-0 transform lg:space-y-0 space-y-4 lg:flex flex-wrap ${isOpen ? "translate-x-20" : "-translate-x-full"}`}>

                        <div>
                            <Link to="/" onClick={Navbar} className='hover:bg-slate-200 px-6 py-4'>Homepage</Link>
                        </div>

                        {!authState ? (  //if not logged in show the register and login button but if looged in show the logout button
                            <>
                                <div>
                                    <Link to="register" onClick={Navbar} className='hover:bg-slate-200 px-6 lg:px-3 2xl:px-6 py-4'> Register</Link>
                                </div>

                                <div>
                                    <Link to="login" onClick={Navbar} className='hover:bg-slate-200 px-6 lg:px-3 2xl:px-6  py-4'> Login</Link>
                                </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    <Link to="createpost" onClick={Navbar} className='hover:bg-slate-200 px-6 lg:px-3 2xl:px-6  py-4'> Create post</Link>
                                </div>

                                
                                <div>
                                    <Link to={`profile/${user.username}`} onClick={Navbar} className='hover:bg-slate-200 lg:px-3 2xl:px-6 px-6 py-4'> View Profile</Link>
                                </div>

                                <div className='px-6 py-3'>
                                    <Link to="login" className='bg-gray-700 text-white px-6 lg:px-3 2xl:px-6  py-2' onClick={logout}> Logout</Link>
                                </div>
                            </>
                        )}
                    </div>

                </div>


            </div>

            <div className='pt-32'>
                <Outlet />
            </div>

        </>
    )
}