import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";   //to make use of formik to handle the form creation for the posts
import * as Yup from 'yup';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import baseUrl from '../baseUrl';




export const Register = () => {

    const navigate = useNavigate();

    //creating  intialvalues for formik
    const intialValues = {
        firstname: "",// for title field
        lastname: "",
        email: "",
        username: "",
        password: "",
        cpassword: ""
    }


    //validationSchema--- to integrate validations on the form using Yup
    const validationSchema = Yup.object().shape({
        firstname: Yup.string().required("Please input the title"),  //i.e it must be a string and its required
        lastname: Yup.string().required("Your must enter the post body"), //error message is defined for required
        email: Yup.string().email('Invalid email').required('Email is required'),
        username: Yup.string().min(3).max(15).required("please input your username"), //i.e it must be a string, with at least 3 letter and cant exceed 15 letter and also required
        password: Yup.string().min(4).max(20).required()
    })


    const onSubmit = (data) => {
        //formik send the inputs to the onsubmit function as data
        let details = data;

        if (details.cpassword !== details.password) {
            alert("password doesn't match")
        } else {
            //handling post request with axios, to submit the data  from the form to the database  the  api **** your pass data (i.e details from the form) as the second arguement which is the req.body in backend api
            axios.post(`${baseUrl}/auth`, data).then((response) => {
                console.log(response.data)  // just to check if it works

                if(response.data.error){
                    alert(response.data.error)
                }else{
                    navigate("/login");
                    alert("registration successful")
                }
            }).catch((err) => {
                console.log(err);
            });
        }

    }


    return (
        <>
            <div className="shadow w-96 p-5 text-center mx-auto">
                <p className="text-xl py-5 font-medium">Register</p>

                <Formik initialValues={intialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    <Form >
                        <div>
                            <label>Firstname</label> <br></br>
                            {/* name must be the same as in database model */}
                            <Field type="text" className="w-full h-12 px-3 py-2 my-1 rounded-lg border-0 shadow-sm focus:outline-none focus:border-indigo-700 bg-slate-100 text-base" name="firstname" placeholder="input firstname" />
                            <ErrorMessage name="firstname" component="span" className="text-red-500" /> {/*to display the error message for the field*/}
                        </div>

                        <div>
                            <label>Lastname</label><br></br>
                            <Field type="text" className="w-full h-12 px-3 py-2 my-1 rounded-lg border-0 shadow-sm focus:outline-none focus:border-indigo-700 bg-slate-100 text-base" name="lastname" placeholder="input lastname" />
                            <ErrorMessage name="lastname" component="span" className="text-red-500" /> {/*to display the error message for the field*/}
                        </div>

                        <div>
                            <label>Email Address</label><br></br>
                            <Field type="text" className="w-full h-12 px-3 py-2 my-1 rounded-lg border-0 shadow-sm focus:outline-none focus:border-indigo-700 bg-slate-100 text-base" name="email" placeholder="input your email" />
                            <ErrorMessage name="email" component="span" className="text-red-500" /> {/*to display the error message for the field*/}
                        </div>

                        <div>
                            <label>Username</label><br></br>
                            <Field type="text" className="w-full h-12 px-3 py-2 my-1 rounded-lg border-0 shadow-sm focus:outline-none focus:border-indigo-700 bg-slate-100 text-base" name="username" placeholder="input your username" />
                            <ErrorMessage name="username" component="span" className="text-red-500" /> {/*to display the error message for the field*/}
                        </div>

                        <div>
                            <label>Password</label><br></br>
                            <Field type="password" className="w-full h-12 px-3 py-2 my-1 rounded-lg border-0 shadow-sm focus:outline-none focus:border-indigo-700 bg-slate-100 text-base" name="password" placeholder="input your password" />
                            <ErrorMessage name="password" component="span" className="text-red-500" /> {/*to display the error message for the field*/}
                        </div>

                        <div>
                            <label>Confirm Password</label><br></br>
                            <Field type="password" className="w-full h-12 px-3 py-2 my-1 rounded-lg border-0 shadow-sm focus:outline-none focus:border-indigo-700 bg-slate-100 text-base" name="cpassword" placeholder="confirm password" />
                            <ErrorMessage name="cpassword" component="span" className="text-red-500" /> {/*to display the error message for the field*/}
                        </div>

                        <button type="submit" className="w-full px-3 py-4 bg-yellow-700 text-white font-medium mt-6 rounded-lg">Register</button>
                    </Form>
                </Formik>

            </div>
        </>
    )
}