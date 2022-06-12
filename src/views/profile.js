import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import baseUrl from '../baseUrl';
import { UserSkeleton } from '../skeletons/skeletonUser';



export const ProfilePage = () => {

    let { username } = useParams();
    const [userProfile, setUserProfile] = useState(null);
    const [userPost, setUserPost] = useState([]);


    useEffect(() => {

        if (!authState) { //if authState in false (i.es not logged in got to homepage)

            navigate('/')

        } else {
            axios.get(`${baseUrl.baseUrl}/auth/profile/${username}`,
                { headers: { accessToken: localStorage.getItem("JWT") } }
            ).then((response) => {

                setTimeout(() => {
                    setUserProfile(response.data)
                }, 3000)

            }).catch((err) => {
                console.log(err)
            });



            //to get all the post the user has made
            axios.get(`${baseUrl.baseUrl}/posts/profile/${username}`,
                { headers: { accessToken: localStorage.getItem("JWT") } }
            ).then((response) => {
                setUserPost(response.data)
            }).catch((err) => {
                console.log(err)
            });
        }

    }, []);


    const navigate = useNavigate();

    let { user, authState } = useContext(AuthContext);


    // to navigate to each post
    const routPost = (idg) => {
        navigate(`/post/${idg}`)
        // console.log(idg)
    }







    return (
        <>
            <div className='lg:flex flex-wrap space-y-6 lg:space-y-0'>
                <div className='lg:w-1/2  px-8'>
                    <p className='mx-6 font-bold text-2xl'>Profiles Pages</p>

                    {userProfile && (

                        <div className='mt-8 space-y-5 border shadow-md p-10 rounded-2xl'>
                            <div className='flex flex-wrap items-center'>
                                <div className="">
                                    <i className='fa-solid fa-circle-user mr-6' style={{fontSize:'8rem'}}></i>
                                </div>

                                <div className=''>
                                    <p className='text-4xl md:text-5xl font-bold  mt-6 md:mt-0'>{userProfile.firstname} {userProfile.lastname}</p>
                                </div>
                            </div>

                            <div>Email: <span className='text-xl md:text-2xl font-medium'>{userProfile.email}</span></div>
                            <div>Username: <span className='text-xl md:text-2xl font-medium'>{userProfile.username}</span></div>
                            
                            {user.username === userProfile.username && (<button className='bg-slate-200 px-4 py-3 hover:bg-gray-700 hover:text-white' onClick={() => navigate("/changepassword")}>Change Password</button>)}
                        </div>

                    )}


                    {/* to display users skeleton */}
                    {!userProfile && (<div className='mx-6 md:w-1/2'><UserSkeleton theme="light" /></div>)}
                </div>



                {/* user posts */}

                <div className='lg:w-1/2 space-y-4'>
                    <p className='mx-6 font-bold text-2xl mt-12 md:mt-0'>Posts of the User</p>
                    {
                        userPost.map((each, index) => {
                            return (
                                <>

                                    <div key={each.id} className="border mx-6 flex-1 shadow-sm rounded-lg">
                                        <h2 className="text-2xl bg-yellow-600 font-bold  rounded-t-lg text-white text-center py-4">{each.title}</h2>
                                        <div className="p-12 cursor-pointer" onClick={() => routPost(each.id)}>
                                            <p>{each.postBody}</p>
                                        </div>
                                        <div className="py-4 bg-slate-50 rounded-lg">
                                            <div className="flex flex-wrap justify-between items-center">
                                                <div className="w-3/4 px-8">
                                                    <p className="text-gray-400"> This post was created at <span className="text-gray-400 ">{each.createdAt} </span>  </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </>
                            )
                        })
                    }
                </div>
            </div>





        </>
    )
}