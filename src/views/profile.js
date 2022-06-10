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
            <div className='md:flex flex-wrap space-y-6'>
                <div className='md:w-1/2'>
                    <p className='mx-6 font-bold text-2xl'>Profiles Pages</p>
                    {userProfile && (<div className='mx-6'>
                        <p>{userProfile.firstname}</p>
                        <p>{userProfile.lastname}</p>
                        <p>{userProfile.email}</p>
                        <p>{userProfile.username}</p>
                        {user.username === userProfile.username && (<button className='bg-slate-200 px-4 py-3' onClick={() => navigate("/changepassword")}>Change Password</button>)}
                    </div>
                    )
                    }

                    {/* to display users skeleton */}
                    {!userProfile && ( <div className='mx-6 md:w-1/2'><UserSkeleton theme="light"/></div>)}
                </div>



                {/* user posts */}

                <div className='md:w-1/2 space-y-4'>
                    <p className='mx-6 font-bold text-2xl'>Posts of the User</p>
                    {
                        userPost.map((each, index) => {
                            return (
                                <>

                                    <div key={each.id} className=" mx-6 flex-1 shadow-sm">
                                        <h2 className="text-2xl bg-yellow-600 font-bold text-white text-center py-4">{each.title}</h2>
                                        <div className="p-12 cursor-pointer" onClick={() => routPost(each.id)}>
                                            <p>{each.postBody}</p>
                                        </div>
                                        <div className="py-4 bg-slate-50">
                                            <div className="flex flex-wrap justify-between items-center">
                                                <div className="w-3/4">
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