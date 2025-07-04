import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import { Link } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import axios from 'axios';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { createUser , updateUserProfile} = useAuth();
    const [profilePic,setProfilePic] = useState('');

    const onSubmit = data => {
        console.log(data)
        createUser(data.email, data.password)
            .then(result => {
                console.log(result.user)
                // 4. go to auth provder for update profile 
                //5. here 
                const profileInfo = {
                    displayName : data.name,
                    photoURL : profilePic
                }
                updateUserProfile(profileInfo)
                .then(()=>{
                    console.log('profile picture update')
                })
                .catch(error =>{
                    console.log(error)
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleUpload = async (e) => {
        const image = e.target.files[0];
        const formData = new FormData();
        formData.append('image', image);
        console.log(formData)
        //1 now go to api key  and put in env file 
        //2. and also copy link from example call// cut expirtaion to &
        const res = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_img_key}`,formData)

       setProfilePic(res.data.data.url)
        // 3.decalere a state then update profile in firebase 
    }


    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
                <h1 className="text-4xl font-bold">Create Account Now!</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset">
                        {/* name  */}
                        <label className="label">Name</label>
                        <input type="text" {...register('name', { required: true })} className="input" placeholder="Your Name" />
                        {/* Profile Photo  */}
                        <label className="label">Profile  Photo</label>
                        <input type="file"
                            onChange={handleUpload}
                            className="input" placeholder="Upload Your Photo" />
                        {/* email  */}
                        <label className="label">Email</label>
                        <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />
                        {
                            errors.email?.type === "required" &&
                            <p className='text-red-600'>This is required</p>
                        }
                        {/* password  */}
                        <label className="label">Password</label>
                        <input type="password" {...register('password', { required: true, minLength: 4 })} className="input" placeholder="Password" />
                        {
                            errors.password?.type === 'required' && <p className='text-red-600'>Password is required</p>
                        }
                        {
                            errors.password?.type === 'minLength' && <p className='text-red-600'>Password Must be 4 Character</p>
                        }

                        <div><a className="link link-hover">Forgot password?</a></div>
                        <button className="btn btn-primary text-black mt-4 ">Register</button>
                    </fieldset>
                    <p><small>Already have and account?<Link className='btn btn-link  pl-0' to='/login'>Login</Link></small></p>
                </form>
                <SocialLogin></SocialLogin>

            </div>
        </div>
    );
};

export default Register;