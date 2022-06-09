import axios from "axios";
import baseUrl from '../baseUrl';

import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";





export const Post = () => {


    const navigate = useNavigate();

    let { pId } = useParams();

    const [postDetails, setpostDetails] = useState({});
    const [commentDetails, setcommentDetails] = useState([]);
    const [newComment, setnewComment] = useState("");

    let { user } = useContext(AuthContext);


    useEffect(() => {
        //  the post id from the useparams to backend , (with the rout api that collects the id) 
        //to fetch the post details.
        axios.get(`${baseUrl}/posts/postId/${pId}`).then((response) => {
            setpostDetails(response.data) //to the get post with the id sent from backend
        }).catch((err) => {
            console.log(err);
        })


        //  the post id from the useparams to backend , (with the rout api that collects the id) 
        //to fetch the comments for the post.
        axios.get(`${baseUrl}/comments/${pId}`).then((response) => {
            setcommentDetails(response.data) //to the get post with the id sent from backend
        }).catch((err) => {
            console.log(err);
        })

    }, []); //[] is need to let useeffect run once





    //add comment
    const addComment = (data) => {

        let today = new Date();
        let day = today.getFullYear() + ":" + today.getMonth() + ":" + today.getDate();
        let time = today.getHours() + ":" + today.getMinutes();

        //to submit the comment form to the database and add comments
        //passing the details to the database just as ordinary object
        axios.post(`${baseUrl}/comments`, { commentBody: newComment, PostId: pId }, //body
            { headers: { accessToken: localStorage.getItem("JWT") } } //to send the JWT to the backend has a header

        ).then((response) => {
            if (response.data.error) { //i.es if error is sent as response
                alert("You cannot  perfome this operation")
            } else {
                console.log(response.data)
                const commentToAdd = { commentBody: newComment, createdAt: day + " " + time, username: response.data.username } //create a new object to hold the new comment
                setcommentDetails([...commentDetails, commentToAdd]); //so as to update the comments without refreshinmg before it shows...spread the former comments and add new one.
                setnewComment("");
            }
        }).catch((err) => {
            console.log(err)
        })

    }


    //to delete comments
    const deleteComment = (id) => {
        axios.delete(`${baseUrl}/comments/${id}`,
            {
                headers: {
                    accessToken: localStorage.getItem("JWT")
                }
            }).then((response) => {
                setcommentDetails(commentDetails.filter((eachComments) => eachComments.id !== id))
            }).catch((err) => {
                console.log(err)
            })
    }


    //to delete post
    const deletePost = (id) => {
        axios.delete(`${baseUrl}/posts/${id}`,
            { headers: { accessToken: localStorage.getItem("JWT") } }
        ).then((response) => {
            navigate("/")
        })
    }


    //to edit a post (either the title or the post body)
    const editPost = (option) => {
        if (option === "title") {
            let newTitle = prompt("Enter new title");   //enter new title is the label of the input
            
            axios.put(`${baseUrl}/posts/title`, 
            {
                newTitle : newTitle,
                id : pId //pId from the useParams 
            },

            {
                headers : { accessToken: localStorage.getItem("JWT") }
            }

            ).then((response) => {
                console.log(response)
            }).catch((err) => {
                console.log(err)
            })

            //to update the post in the frontend instantly
            setpostDetails({...postDetails, title:newTitle});

        } else {
            let newPostbody = prompt("Enter new post body");

            axios.put(`${baseUrl}/posts/postbody`, 
            {
                newpostBody : newPostbody,
                id : pId //pId from the useParams 
            },

            {
                headers : { accessToken: localStorage.getItem("JWT") }
            }

            ).then((response) => {
                console.log(response)
            }).catch((err) => {
                console.log(err)
            })

            //to update the post in the frontend instantly
            setpostDetails({...postDetails, postBody:newPostbody});
        }
    }




    return (
        <>
            <div className="md:flex flex-wrap">
                <div className="px-24 flex-1 ">
                    {/* to enable the edit button only for the user that create the post when they login */}
                    <h2 className="text-2xl bg-yellow-600 font-bold text-white text-center py-4"
                        onClick={() => {
                            if (user.username === postDetails.username) {
                                editPost("title")
                            }
                        }
                        }>{postDetails.title}</h2>


                    <div className="p-12">
                        {/* to enable the edit button only for the user that create the post when they login */}
                        <p onClick={() => { if (user.username === postDetails.username) { editPost("body") } }}>{postDetails.postBody}</p>
                    </div>
                    <div className="py-4 bg-slate-50">
                        <div className="flex flex-wrap justify-between items-center">
                            <div className="w-3/4">
                                <p className="text-gray-400"> This post was created by <span className="text-black ">{postDetails.username} <i className="text-gray-400">({postDetails.createdAt})</i></span>  </p>
                            </div>

                            {user.username === postDetails.username && (
                                <>
                                    <div className="w-1/4">
                                        <button className="bg-red-600 text-white py-4 px-5 rounded-md" onClick={() => deletePost(postDetails.id)}>Delete Post</button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>






                {/* comment section */}

                <div className=" px-24 flex-1">
                    {/* creating comments */}
                    <div>
                        <input type="text" className="w-full h-12 px-3 py-2 my-1 rounded-lg border-0 shadow-sm focus:outline-none focus:border-indigo-700 bg-slate-100 text-base" value={newComment} placeholder="input title" onChange={(e) => setnewComment(e.target.value)} />
                        <button type="submit" className="w-full px-3 py-4 bg-yellow-700 text-white font-medium mt-6 rounded-lg" onClick={addComment}>submit</button>
                    </div>


                    {/* listing comments */}
                    <div>
                        <p className="text-2xl my-5">All comments</p>
                        {
                            commentDetails.slice(0).reverse().map((comment, index) => {
                                return (
                                    <div className="flex flex-wrap gap-6 items-center">

                                        <div key={index} id={index} className='shadow-lg w-10/12 mt-5 text-center'>
                                            <div className="font-bold p-5 bg-black text-white rounded-t-lg"> @ {comment.username} : {comment.commentBody} </div>
                                            <p className='bg-yellow-600 p-5 rounded-b-lg'> {comment.createdAt} </p>
                                        </div>

                                        {/* to show the delete button only for the user that makes the comment (i.e when the user logged in) */}
                                        {user.username === comment.username && (
                                            <div className="w-5/8">
                                                <button className="bg-red-500 px-8 py-4 rounded-lg font-medium text-white hover:shadow-lg" onClick={() => deleteComment(comment.id)}>X</button>
                                            </div>
                                        )}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}