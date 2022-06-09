import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import baseUrl from '../baseUrl';



export const ProfilePage = () => {

    let { username } = useParams();
    const [userProfile, setUserProfile] = useState({});
    const [userPost, setUserPost] = useState([]);


    useEffect(() => {

        if (!authState) { //if authState in false (i.es not logged in got to homepage)

            navigate('/')

        } else {
            axios.get(`${baseUrl}/auth/profile/${username}`,
                { headers: { accessToken: localStorage.getItem("JWT") } }
            ).then((response) => {
                setUserProfile(response.data)
            }).catch((err) => {
                console.log(err)
            });


            axios.get(`${baseUrl}/posts/profile/${username}`,
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
            <div className='flex flex-wrap'>
                <div className='flex-1'>
                    <p>Profiles Pages</p>

                    <p>{userProfile.firstname}</p>
                    <p>{userProfile.lastname}</p>
                    <p>{userProfile.email}</p>
                    <p>{userProfile.username}</p>
                    { user.username === userProfile.username && (<button className='bg-slate-200 px-4 py-3' onClick={() => navigate("/changepassword")}>Change Password</button>)}
                    
                </div>

                <div className='flex-1'>
                    <p>Posts of the User</p>
                    {
                        userPost.map((each, index) => {
                            return (
                                <>

                                    <div className="px-24 flex-1 ">
                                        <button className='px-3 py-2 rounded-md bg-black text-white'>
                                            Like
                                        </button>
                                        <label>{each.Likes.length}</label>
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