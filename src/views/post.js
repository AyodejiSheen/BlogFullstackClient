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



    //for dropdown options
    const [drop, setDrop] = useState("drops");

    const handledrop = (e) => {
        setDrop(e);
    };




    useEffect(() => {
        //  the post id from the useparams to backend , (with the rout api that collects the id) 
        //to fetch the post details.
        axios.get(`${baseUrl.baseUrl}/posts/postId/${pId}`).then((response) => {
            setpostDetails(response.data) //to the get post with the id sent from backend
            console.log("welcome")
        }).catch((err) => {
            console.log(err);
        })


        //  the post id from the useparams to backend , (with the rout api that collects the id) 
        //to fetch the comments for the post.
        axios.get(`${baseUrl.baseUrl}/comments/${pId}`).then((response) => {
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
        axios.post(`${baseUrl.baseUrl}/comments`, { commentBody: newComment, PostId: pId }, //body
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
        axios.delete(`${baseUrl.baseUrl}/comments/${id}`,
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
        axios.delete(`${baseUrl.baseUrl}/posts/${id}`,
            { headers: { accessToken: localStorage.getItem("JWT") } }
        ).then((response) => {
            navigate("/")
        })
    }


    //to edit a post (either the title or the post body)
    const editPost = (option) => {
        if (option === "title") {

            let newTitle = prompt("Enter new title");   //enter new title is the label of the input

            if (newTitle === "") {
                alert("Post title cannot be empty")
            } else {
                axios.put(`${baseUrl.baseUrl}/posts/title`,
                    {
                        newTitle: newTitle,
                        id: pId //pId from the useParams 
                    },

                    {
                        headers: { accessToken: localStorage.getItem("JWT") }
                    }

                ).then((response) => {
                    console.log(response)
                }).catch((err) => {
                    console.log(err)
                })

                //to update the post in the frontend instantly
                setpostDetails({ ...postDetails, title: newTitle });
            }


        } else {

            let newPostbody = prompt("Enter new post body");

            if (newPostbody === "") {
                alert("Post Body cannot be empty")
            } else {
                axios.put(`${baseUrl.baseUrl}/posts/postbody`,
                    {
                        newpostBody: newPostbody,
                        id: pId //pId from the useParams 
                    },

                    {
                        headers: { accessToken: localStorage.getItem("JWT") }
                    }

                ).then((response) => {
                    console.log(response)
                }).catch((err) => {
                    console.log(err)
                })

                //to update the post in the frontend instantly
                setpostDetails({ ...postDetails, postBody: newPostbody });
            }


        }
    }






    return (
        <>
            <div className="xl:flex flex-wrap space-y-8 xl:space-y-0">
                <div className="xl:w-3/5 px-5 xl:px-20">
                    {/* to enable the edit button only for the user that create the post when they login */}
                    <div className=" justify-between flex flex-wrap px-5 text-2xl bg-yellow-600 font-bold text-white text-center py-4 relative">

                        <div>{postDetails.title}</div>
                        <div>
                            {user.username === postDetails.username && (
                                <button className="mr-3 text-xl  md:mr-0 space-x-4 items-center focus:outline-none dark:focus:ring-gray-600" onClick={() => handledrop("drop1")}>
                                    <i className="fa-solid fa-ellipsis rotate-90"></i>
                                </button>
                            )}

                            <div
                                hidden={drop !== "drop1"}
                                className=" absolute right-0 md:top-0 z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                            >
                                <div className="md:py-3 md:px-4">
                                    <ul className="py-1" aria-labelledby="dropdown">
                                        <li>
                                            <button
                                                onClick={handledrop}
                                                className="w-full text-left block py-2 px-4 text-xs md:text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                            >
                                                <i className="fa-solid fa-xmark mr-3 "></i> Dismiss
                                            </button>
                                        </li>
                                        <li>
                                            <button className="block py-2 px-4  text-xs md:text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                                onClick={() => {
                                                    if (user.username === postDetails.username) {
                                                        editPost("title")
                                                    }
                                                }
                                                }>
                                                <i class="fa-solid fa-pen-to-square mr-3"></i> Edit Post Title
                                            </button>
                                        </li>

                                        <li>
                                            {/* to enable the edit button only for the user that create the post when they login */}
                                            <button className="block py-2 px-4  text-xs md:text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                                onClick={() => {
                                                    if (user.username === postDetails.username) {
                                                        editPost("body")
                                                    }
                                                }
                                                }>
                                                <i class="fa-solid fa-pen-to-square mr-3"></i> Edit Post body
                                            </button>
                                        </li>

                                        <li>
                                            <button
                                                className="block py-2 px-4  text-xs md:text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                                onClick={() => deletePost(postDetails.id)} >
                                                <i class="fa-solid fa-trash-can mr-3"></i>Delete Post
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="p-12">
                        <p>{postDetails.postBody}</p>
                    </div>
                    <div className="py-4 bg-slate-50">
                        <div className="flex flex-wrap justify-between items-center">
                            <div className="w-3/4">
                                <p className="text-gray-400"> This post was created by <span className="text-black ">{postDetails.username} <i className="text-gray-400 font-mono">({postDetails.createdAt})</i></span>  </p>
                            </div>
                        </div>
                    </div>
                </div>






                {/* comment section */}

                <div className="xl:w-2/5 px-5 xl:px-10">
                    {/* creating comments */}
                    <div>
                        <textarea rows="4" className="w-full px-3 py-2 my-1 rounded-lg border-0 shadow-sm focus:outline-none focus:border-indigo-700 bg-slate-100 text-base" value={newComment} placeholder="Enter your comment" onChange={(e) => setnewComment(e.target.value)} />

                        <button type="submit" className="w-full px-3 py-4 bg-yellow-700 text-white font-medium mt-6 rounded-lg" onClick={addComment}>submit</button>
                    </div>


                    {/* listing comments */}
                    <div>
                        <p className="text-2xl my-5 font-medium">All comments</p>

                        {
                            commentDetails.slice(0).reverse().map((comment, index) => {
                                return (

                                    <div key={index} id={index} className='w-full mt-8'>
                                        <div className="bg-gray-700 flex flex-wrap justify-between items-center px-6 text-white py-3 relative">
                                            <div><i className="fa-solid fa-circle-user mr-3 text-2xl"></i> {comment.username}</div>
                                            <div>
                                                {user.username === comment.username && (

                                                    <button className="mr-3 text-xl  md:mr-0 space-x-4 items-center focus:outline-none dark:focus:ring-gray-600" onClick={() => handledrop(comment.id)}>
                                                        <i className="fa-solid fa-ellipsis rotate-90"></i>
                                                    </button>

                                                )}

                                                <div
                                                    hidden={drop !== comment.id}
                                                    className=" absolute right-0 md:top-0 z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                                                >
                                                    <div className="md:py-3 md:px-4">
                                                        <ul className="py-1" aria-labelledby="dropdown">
                                                            <li>
                                                                <button
                                                                    onClick={handledrop}
                                                                    className="block  w-full text-left py-2 px-4 text-xs md:text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                                                >
                                                                    <i className="fa-solid fa-xmark mr-3 "></i> Dismiss
                                                                </button>
                                                            </li>
                                                            <li>
                                                                {/* to show the delete button only for the user that makes the comment (i.e when the user logged in) */ }
                                                                <button
                                                                    className="block py-2 px-4  text-xs md:text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                                                    onClick={() => deleteComment(comment.id)} >
                                                                    <i class="fa-solid fa-trash-can mr-3"></i>Delete Comment
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className=" px-8 py-5">  {comment.commentBody} </div>
                                        <p className='bg-yellow-600 p-2 text-right text-slate-300 font-mono'> {comment.createdAt} </p>
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