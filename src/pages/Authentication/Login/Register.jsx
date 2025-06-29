import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import { Link } from 'react-router';

const Register = () => {
    const { register, handleSubmit ,formState : {errors}} = useForm()
    const {createUser} = useAuth();

    const onSubmit = data => {
        console.log(data)
        createUser(data.email,data.password)
        .then(result =>{
            console.log(result.user)
        })
        .catch(error =>{
            console.log(error)
        })
    }


    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
                <h1 className="text-4xl font-bold">Create Account Now!</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset">
                        {/* email  */}
                        <label className="label">Email</label>
                        <input type="email" {...register('email',{required:true})} className="input" placeholder="Email" />
                        {
                            errors.email?.type === "required" &&
                            <p className='text-red-600'>This is required</p>
                        }
                        {/* password  */}
                        <label className="label">Password</label>
                        <input type="password" {...register('password',{required:true,minLength : 4})} className="input" placeholder="Password" />
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
            </div>
        </div>
    );
};

export default Register;