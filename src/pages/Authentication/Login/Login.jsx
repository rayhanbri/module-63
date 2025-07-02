import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import useAuth from '../../../Hooks/useAuth';


const Login = () => {
    const {signIn} = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const location  = useLocation();
    const navigate = useNavigate();
    const from = location?.state || '/';

    console.log(from)

    const onSubmit = data => {
        console.log(data)
        signIn(data.email,data.password)
        .then(res =>{
            console.log(res.user);
            navigate(from)
        })
        .catch(error =>{
            console.log(error)
        })

    }
    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
                <h1 className="text-5xl font-bold">Login now!</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset">
                        <label className="label">Email</label>
                        <input type="email" {...register('email')} className="input" placeholder="Email" />

                        <label className="label">Password</label>
                        <input type="password" {...register('password', { required: true, minLength: 6 })} className="input" placeholder="Password" />
                        {errors.password?.type === 'required'
                            &&
                            <p className='text-red-600'>Password is required</p>}
                        {
                            errors.password?.type === 'minLength' && <p className='text-red-500'>Password Must Be  6 Character</p>
                        }

                        <div><a className="link link-hover">Forgot password?</a></div>
                        <button className="btn btn-primary text-black mt-4">Login</button>
                    </fieldset>
                    <p><small>Already have and account?<Link className='btn btn-link  pl-0' to='/register'>Register</Link></small></p>
                </form>
                <SocialLogin from={from}></SocialLogin>
            </div>
        </div>
    );
};

export default Login;