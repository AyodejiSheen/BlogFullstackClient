import React, { useContext } from 'react'
import { useEffect, useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import baseUrl from '../baseUrl';
import { SkeltonElement } from '../skeletons/baseElement';
import { PostSkeleton } from '../skeletons/skeletonPost';






export const Homepage = () => {


  //LOGICS START*******
  const [postList, setPostList] = useState(null);
  const navigate = useNavigate();
  const [likedPost, setLikedPost] = useState([]);

  const [liking, setLiking] = useState(null)

  const { authState } = useContext(AuthContext);  //to be able to set the value for AuthState  from the function setAuthState using the useContext passing Authcontext



  useEffect(() => {

    const getPosts = async () => {
      if (authState) { //if not logged in, so that users that are not logged in can view the posts
        //handling get request with axios, to collect or the data sends from the database through the backend api
        await axios.get(`${baseUrl.baseUrl}/posts`,

          { headers: { accessToken: localStorage.getItem("JWT") } }).then((response) => {

            setTimeout(() => {
              setPostList(response.data.postList);  //to get the actual data for the post List
              setLikedPost(response.data.likedPost.map((likes) => {
                console.log("welocme home");
                return (likes.PostId);
              })) //to get just the postId inside the response.data.likedpost sent from backend into an array
              // console.log(likedPost);
              // console.log(postList);
              // setLoader(true); //to switch skeleton loader

            }, 2000)
          });

      } else {

        //handling get request with axios, to collect or the data sends from the database through the backend api
        await axios.get(`${baseUrl.baseUrl}/posts/notlogged`).then((response) => {

          setTimeout(() => {
            setPostList(response.data)  //to get the actual data for the post List
            // setLoader(true); //to switch skeleton loader
            // console.log(response.data);
            // console.log(postList);
          }, 2000)
        });

      }
    }


    getPosts();

  }, [])




  // to navigate to each post
  const routPost = (idg) => {
    navigate(`post/${idg}`)
    // console.log(idg)
  }



  //To like a post
  const likePost = (postId) => {

    if (authState) { //if authState is true (its logged in, so that non-user cant like)

      axios.post(`${baseUrl.baseUrl}/likes`, { PostId: postId },
        { headers: { accessToken: localStorage.getItem("JWT") } }
      ).then((response) => {

        //to be able to update the like value life without refreshing
        setPostList(postList.map((post) => {

          if (post.id === postId) { //if the id of the post clicked is equal to one sent from the function (to increase count for that particular post likes)
            if (response.data.liked) {  // to whether its to like or unlike (so as to decrease like or increase)
              return { ...post, Likes: [...post.Likes, 0] }; //then spread the post, spread the array of likes  (to be able to mutate it) inside the post and then add sumtin inside (0) 
            } else {
              const likeArr = post.Likes;
              likeArr.pop(); // if its to decrease then pop the arr of like (remove the last element)
              return { ...post, Likes: likeArr };
            }
          } else {
            return post
          }
        }));


        //to be able to update the liked color
        // i.e if the postid is include in the likepost array, it means we (unlike) else (we like the post)
        //when its liked we pass the post.id liked into the likedpost array, then the color is update, when unlike will filter the likedpost array to remove the post.id of the post that is unlike
        if (likedPost.includes(postId)) {
          setLikedPost(likedPost.filter((id) => {
            return (id !== postId)
          }))
        } else {
          setLikedPost([...likedPost, postId])
        }




      }).catch((err) => {
        console.log(err)
      })
    } else {
      alert("You cant perform this operation")
    }

  }




  return (
    <>
      <div className='justify-center space-y-16 mx-8'>

        {
          postList && postList.slice(0).reverse().map((post, index) => {
            return (
              <div key={post.id} id={index} className='shadow-lg lg:w-3/4 2xl:w-5/8 mx-auto mt-5 text-center'>
                <div className="font-bold p-5 bg-black text-white rounded-t-lg"> {post.title} </div>
                <div onClick={() => routPost(post.id)} className='p-24 cursor-pointer'> {post.postBody} </div>
                <div className='flex flex-wrap items-center justify-between bg-yellow-600 p-5 rounded-b-lg'>
                  <div className="">
                    <Link to={`profile/${post.username}`}>
                      <button>@{post.username}</button>
                    </Link>
                  </div>

                  <div className='space-x-4'>
                    {/* to be able to to change the like button whether is been like all unlike (you check the the id of the post rendered is inside the likedpost array) */}
                    {/* .includes is a javascript function to check if something is inside an array * (if post.id is inside the array the text change to red , else its white) */}

                    <button onClick={() => likePost(post.id)} className={likedPost.includes(post.id) ? 'px-3 py-2 rounded-md shadow-sm text-sm bg-black text-red-600' : 'px-3 py-2 rounded-md shadow-sm text-sm bg-black text-slate-100'}>
                      <i className="fa-solid fa-heart"></i>
                    </button>
                    <label>{post.Likes.length}</label>
                  </div>


                </div>
              </div>
            )
          })
        }


        {/* //to show skeleton loader when fetching the data from database /backend */}
        {/* to displaying 5 post skeletons */}
        {!postList && (
          <>
            <div className='space-y-16 justify-center  lg:w-3/4 2xl:w-5/8 mx-auto mt-5 '>
              {[1, 2, 3, 4, 5].map((n) => <PostSkeleton key={n} theme="light" />)}
            </div>
          </>
        )}

      </div>

    </>
  )
}