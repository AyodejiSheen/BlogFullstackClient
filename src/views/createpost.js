import { Formik, Form, Field, ErrorMessage } from "formik";   //to make use of formik to handle the form creation for the posts
import * as Yup from 'yup';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";




export const CreatePost = () => {

    const navigate = useNavigate();

    let { user, authState } = useContext(AuthContext); 

    useEffect(() => {

        if(!authState){ //if authState in false (i.es not logged in got to homepage)
            
           navigate('/') 
        }else{
            console.log("OK")
        }

    },[])

    //creating  intialvalues for formik
    const intialValues = {
        title: "",// for title field
        postBody: "",
        username: user.username,
        UserId : user.id
    }

    //validationSchema--- to integrate validations on the form using Yup
    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Please input the title"),  //i.e it must be a string and its required
        postBody: Yup.string().required("Your must enter the post body"), //error message is defined for required
    })


    const onSubmit = (data) => {
        //formik send the inputs to the onsubmit function as data
        // console.log(data);
        //handling post request with axios, to submit the data  from the form to the database  the  api **** your pass data (i.e details from the form) as the second arguement which is the req.body in backend api
      axios.post("http://localhost:3001/posts", data, 
        {headers:{accessToken:localStorage.getItem("JWT")}} //so as to validate the request in backend
      ).then((response) => {
        // console.log(response.data)  // just to check if it works
        navigate("/");
    }).catch((err) => {
        console.log(err)
    });
    
    
    }


    return (
        <>
            <Formik initialValues={intialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="lg:w-1/4 mx-auto p-10 shadow-lg">
                    <div>
                        <label>Title</label> <br></br>
                        {/* name must be the same as in database model */}
                        <Field type="text" className="w-full h-12 px-3 py-2 my-1 rounded-lg border-0 shadow-sm focus:outline-none focus:border-indigo-700 bg-slate-100 text-base" name="title" placeholder="input title" />
                        <ErrorMessage name="title" component="span" className="text-red-500"/> {/*to display the error message for the field*/}
                    </div>

                    <div>
                        <label>Post Body</label><br></br>
                        <Field type="text" className="w-full h-12 px-3 py-2 my-1 rounded-lg border-0 shadow-sm focus:outline-none focus:border-indigo-700 bg-slate-100 text-base" name="postBody" placeholder="input post body" />
                        <ErrorMessage name="postBody" component="span" className="text-red-500"/> {/*to display the error message for the field*/}
                    </div>
                    <button type="submit" className="w-full px-3 py-4 bg-yellow-700 text-white font-medium mt-6 rounded-lg">Create Post</button>
                </Form>
            </Formik>


        </>
    )
}