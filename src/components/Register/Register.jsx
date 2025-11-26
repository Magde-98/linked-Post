import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import * as z from "zod";

export default function Register() {

  const navigate = useNavigate()

  const schema = z.object({
    name: z.string().min(3, "name must be at least 3 charactrs").nonempty('name is requried'),
    email: z.string().email('email is not valid').nonempty('email is requried'),
    password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,  "Password must have at least 8 chars, 1 uppercase, 1 lowercase, 1 number, and 1 special char").nonempty('password is required'),
    rePassword: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "confirm password not valid").nonempty("Confirm password is required"),
    dateOfBirth: z.string().nonempty('date of birth is required'),
    gender: z.enum(["female", "male"], { message: "enter valid gender" }),
  })
    .refine((data) => data.password === data.rePassword, {
      message: "Passwords do not match",
      path: ["rePassword"],
    })

  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm({
    resolver: zodResolver(schema)
  })

  async function onSubmit(values) {
    console.log('data', values)

    try {
      const { data } = await axios.post('https://linked-posts.routemisr.com/users/signup', values)
      console.log('response', data)
      if(data.message === "success"){
          navigate('/login')
      }

    } catch (err) {
      console.log('error', err)
      setError('root', { message: err.response.data.error })
    }


  }
  return (
    <div className='w-[50%] mx-auto p-5 my-6 shadow-lg rounded-xl'>
      <h1 className='text-sky-700 text-3xl font-semibold'>Register Now</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='my-4'>
        <input {...register('name')} type="text" className="input w-full mt-4" placeholder="Type Your Name" />
        {errors.name ? <p className='text-red-600'>{errors.name.message}</p> : null}
        <input {...register('email')} type="email" className="input w-full mt-4" placeholder="Type Your Email" />
        {errors.email ? <p className='text-red-600'>{errors.email.message}</p> : null}
        <input {...register('password')} type="password" className="input w-full mt-4" placeholder="Type Your Password" />
        {errors.password ? <p className='text-red-600'>{errors.password.message}</p> : null}
        <input {...register('rePassword')} type="password" className="input w-full mt-4" placeholder="Confirm Your Password" />
        {errors.rePassword ? <p className='text-red-600'>{errors.rePassword.message}</p> : null}
        <input {...register('dateOfBirth')} type="date" className="input w-full mt-4 mb-4" placeholder="select your date" />
        {errors.dateOfBirth ? <p className='text-red-600'>{errors.dateOfBirth.message}</p> : null}
        <div className='mb-4'>
          <input {...register('gender')} type="radio" id='m' value='male' name="gender" className="radio radio-primary" />
          <label htmlFor='m' className='mx-2'>Male</label>
          <input {...register('gender')} type="radio" id='f' value='female' name="gender" className="radio radio-primary" />
          <label htmlFor='f' className='mx-2'>Female</label>

        </div>
        {errors.gender ? <p className='text-red-600' >{errors.gender.message}</p> : null}

        {errors.root ? <p className='text-red-700 my-3 text-center'>{errors.root.message}</p> : null}
        <button className='text-slate-200 bg-sky-700 hover:bg-sky-900 px-5 py-2 rounded-md'>
          {isSubmitting ? "loading..." : "SignUp"}
        </button>
      </form>
    </div>
  )
}
