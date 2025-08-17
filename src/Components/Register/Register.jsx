import React from "react";
import style from "./Register.module.css";
import { useForm } from "react-hook-form";
import z from "zod";

export default function Register() {
  const schema = z
    .object({
      name: z.string().min(1, "Name is Required").max(10, "Max char is 10"),
      email: z.email("Invaild email"),
      password: z.regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Must include 1 captial letter at least & small letter at least & 1 spicial char & 1 num at least and min length 8"
      ),
      rePassword: z.string(),
      dateOfBirth: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/)
        .refine((data) => {
          const userDate = new Date(date);
          const now = new date();
          now.setHours(0, 0, 0, 0);

          return userDate < now;
        }, "can't be future date "),
      gender: z.enum(["male", "female"], "gender must be on of male or female"),
    })
    .refine((object) => object.password === object.rePassword, {
      error: "password and rePassword not matched !!",
      path: ["rePassword"],
    });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
  });

  let { register, handleSubmit } = form;

  function handleRegister(values) {
    console.log(values);
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(handleRegister)}
        className='max-w-md my-12 mx-auto'
      >
        <div className='relative z-0 w-full mb-5 group'>
          <input
            type='text'
            {...register("name")}
            id='name'
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            placeholder=' '
          />
          <label
            htmlFor='name'
            className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
          >
            Enter Your Name
          </label>
        </div>
        <div className='relative z-0 w-full mb-5 group'>
          <input
            type='email'
            {...register("email")}
            id='email'
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            placeholder=' '
          />
          <label
            htmlFor='email'
            className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
          >
            Enter Your E-mail
          </label>
        </div>
        <div className='relative z-0 w-full mb-5 group'>
          <input
            type='password'
            {...register("password")}
            id='password'
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            placeholder=' '
          />
          <label
            htmlFor='password'
            className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
          >
            Enter Your Password
          </label>
        </div>
        <div className='relative z-0 w-full mb-5 group'>
          <input
            type='password'
            {...register("rePassword")}
            id='rePassword'
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            placeholder=' '
          />
          <label
            htmlFor='rePassword'
            className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
          >
            Enter Your rePassword
          </label>
        </div>
        <div className='relative z-0 w-full mb-5 group'>
          <input
            type='date'
            {...register("dateOfBirth")}
            id='dateOfBirth'
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            placeholder=' '
          />
          <label
            htmlFor='dateOfBirth'
            className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
          >
            Enter Your Birthday
          </label>
        </div>
        <div className='flex gap-4'>
          <div className='flex items-center mb-4'>
            <input
              id='male'
              type='radio'
              {...register("gender")}
              defaultValue='male'
              className='w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600'
              defaultChecked
            />
            <label
              htmlFor='male'
              className='block ms-2  text-sm font-medium text-gray-900 dark:text-gray-300'
            >
              Male
            </label>
          </div>
          <div className='flex items-center mb-4'>
            <input
              id='female'
              type='radio'
              {...register("gender")}
              defaultValue='female'
              className='w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600'
              defaultChecked
            />
            <label
              htmlFor='female'
              className='block ms-2  text-sm font-medium text-gray-900 dark:text-gray-300'
            >
              Female
            </label>
          </div>
        </div>
        <button
          type='submit'
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Submit
        </button>
      </form>
    </>
  );
}
