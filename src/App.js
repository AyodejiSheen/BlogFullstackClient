import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Homepage } from './views/homepage';
import { Navbar } from './navbar';
import { CreatePost } from './views/createpost';
import { Post } from './views/post';
import { Login } from './views/login';
import { Register } from './views/register';
import { AuthContext } from './context/AuthContext' //to make sure the AuthContext API is always avaliable in all the components
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ProfilePage } from './views/profile';
import { Errorpage } from './views/error';
import Changepassword from './views/changepassword';
import Forgotpassword from './views/forgot password';
import Resetpassword from './views/reset-password';


//importing  baseUrl
import baseurl from './baseUrl'



function App() {

  const [authState, setAuthState] = useState(false);
  const [user, setUser] = useState({});


  //with useeffect
  //to verify the JWT token the use is using to log in at the homepage and when app is refresh and also set user login status and user infos
  useEffect(() => {
    // console.log("am running")
    let token = localStorage.getItem('JWT')
    // console.log(token);
    axios.get(`${baseurl}/auth/auth`, {
      headers: {
        accessToken: token,
      },
    }).then((response) => {
      if (response.data.error) {
        setAuthState(false)  //i.es if the  token is valid
      } else {
        // console.log(response.data)
        setAuthState(true)  // no valid token
        setUser(response.data) // to collect the users details
      }
    })

  }, []);






  return (
    <>

      <AuthContext.Provider value={{ user, setUser, authState, setAuthState }}> {/*  the authState, setAuthState is passed to the value here to make sure authState, setAuthState is avaliable in all the components */}
        <Routes>
          <Route path='/' element={<Navbar />}>
            <Route index element={<Homepage />}></Route>
            <Route path='createpost' element={<CreatePost />}></Route>
            <Route path='post/:pId' element={<Post />}></Route>
            <Route path='login' element={<Login />}></Route>
            <Route path='register' element={<Register />}></Route>
            <Route path='profile/:username' element={<ProfilePage />}></Route>     {/* to view the profile of the user that make a post */}
            <Route path='changepassword' element={<Changepassword/>}></Route>
            <Route path='reset-password' element={<Forgotpassword/>}></Route>
            <Route path='reset-password/:id/:token' element={<Resetpassword/>}></Route>

            <Route path='*' element={<Errorpage />}></Route>
          </Route>
        </Routes>
      </AuthContext.Provider>

    </>
  );
}




export default App;
