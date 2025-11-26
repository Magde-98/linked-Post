import { zodResolver } from '@hookform/resolvers/zod';
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import * as z from "zod";
import axios from 'axios'
import { tokenContext } from '../../context/tokenContext';

export default function Login() {
  const navigate = useNavigate()

  const {token,setToken} = useContext(tokenContext);

  const schema = z.object({
    email: z.string().email('email is not valid').nonempty('email is requried'),
    password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,  "Password must have at least 8 chars, 1 uppercase, 1 lowercase, 1 number, and 1 special char").nonempty('password is required'),

  })
 

  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm({
    resolver: zodResolver(schema)
  })

  async function onSubmit(values) {
    console.log('data', values)

    try {
      const { data } = await axios.post('https://linked-posts.routemisr.com/users/signin', values)
      if(data.message === "success"){
          setToken(data.token)
          localStorage.setItem('token',data.token);
          navigate('/')
      }

    } catch (err) {
      console.log('error', err)
      setError('root', { message: err.response.data.error })
    }


  }
  return (
    
    <div className='w-[50%] mx-auto p-5 my-6 shadow-lg rounded-xl'>
      <h1 className='text-sky-700 text-3xl font-semibold'>Login Now</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='my-4'>
        
        <input {...register('email')} type="email" className="input w-full mt-4" placeholder="Type Your Email" />
        {errors.email ? <p className='text-red-600'>{errors.email.message}</p> : null}
        <input {...register('password')} type="password" className="input w-full mt-4 mb-4" placeholder="Type Your Password" />
        {errors.password ? <p className='text-red-600'>{errors.password.message}</p> : null}
       

        {errors.root ? <p className='text-red-700 my-3 text-center'>{errors.root.message}</p> : null}
        <button className='text-slate-200 bg-sky-700 hover:bg-sky-900 px-5 py-2 rounded-md'>
          {isSubmitting ? "loading..." : "SignIn"}
        </button>
      </form>
    </div>
  )
}
