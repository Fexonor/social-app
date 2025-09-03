import React from "react";
import style from "./Profile.module.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import UserPosts from "../UserPosts/UserPosts";
import { useParams } from "react-router-dom";

export default function Profile() {
  function getUserData() {
    return axios.get(`https://linked-posts.routemisr.com/users/profile-data`, {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
  }

  let { data, isError, error, isLoading } = useQuery({
    queryKey: ["userData"],
    queryFn: getUserData,
    select: (data) => data?.data?.user,
  });

  console.log(data);

  return (
    <>
      <div className='w-full md:w-[80%] lg:w-[60%] text-center mx-auto p-4 border-4 border-slate-800 rounded-lg'>
        <img src={data?.photo} className='size-[36px] mx-auto' alt='' />
        <p>Name: {data?.name}</p>
        <p>Gender: {data?.gender}</p>
        <p>Email: {data?.email}</p>
        <p>Birthday: {data?.dateOfBirth}</p>
      </div>

      <UserPosts id={data?._id} />
    </>
  );
}
