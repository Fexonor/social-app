import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import Comment from "../Comment/Comment";

export default function SinglePost() {
  let { id } = useParams();

  function getSinglePost() {
    return axios.get(`https://linked-posts.routemisr.com/posts/${id}`, {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
  }

  let { data, isError, error, isLoading } = useQuery({
    queryKey: ["singlePost"],
    queryFn: getSinglePost,
    select: (data) => data?.data?.post,
  });

  console.log(data); // post

  return (
    <>
      <div className='w-full md:w-[80%] lg:w-[60%] p-3 rounded-md bg-slate-200 text-slate-900 mx-auto my-5'>
        <div className='header flex justify-between gap-3 items-center mb-4'>
          <div className='flex items-center gap-3'>
            <img
              src={data?.user.photo}
              className='size-[36px] rounded-full'
              alt=''
            />
            <span>{data?.user.name}</span>
          </div>
          <p className='text-slate-500'>{data?.createdAt}</p>
        </div>
        {data?.body && <p className='mb-4'>{data?.body}</p>}
        {data?.image && <img src={data?.image} className='rounded-md' alt='' />}

        {data?.comments.map((comment) => (
          <Comment key={comment.id} singleComment={comment} />
        ))}

        {/* <Comment singleComment={post.comments[0]} /> */}
      </div>
    </>
  );
}
