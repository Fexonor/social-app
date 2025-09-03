import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../../Context/PostContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Comment from "../Comment/Comment";
import { Link } from "react-router-dom";
import CreateCommentModal from "../CreateCommentModat/CreateCommentModal";

export default function Home() {
  // let { getPosts } = useContext(PostContext);
  // const [posts, setposts] = useState([]);

  // async function getAllPosts() {
  //   try {
  //     let res = await getPosts();
  //     if (res.length) {
  //       setposts(res);
  //       console.log(res);
  //     } else {
  //       throw new Error("error");
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // useEffect(() => {
  //   getAllPosts();
  // }, []);

  function getAllPosts() {
    return axios.get(`https://linked-posts.routemisr.com/posts?limit=50`, {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
  }

  let { data, isError, error, isLoading } = useQuery({
    queryKey: ["AllPosts"],
    queryFn: getAllPosts,
    staleTime: 20000,
    // retry: 6,
    // retryDelay: 2000,
    // refetchInterval: 2000,
    // refetchIntervalInBackground : true
    // refetchOnWindowFocus: true,
    // gcTime : 5000
    select: (data) => data?.data?.posts,
  });

  console.log(data);

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  if (isLoading) {
    return <div className='spinner'></div>;
  }

  return (
    <>
      {data.map((post) => (
        <div
          key={post.id}
          className='w-full md:w-[80%] lg:w-[60%] p-3 rounded-md bg-slate-200 text-slate-900 mx-auto my-5'
        >
          <Link to={`singlepost/${post.id}`}>
            <div className='header flex justify-between gap-3 items-center mb-4'>
              <div className='flex items-center gap-3'>
                <img
                  src={post.user.photo}
                  className='size-[36px] rounded-full'
                  alt=''
                />
                <span>{post.user.name}</span>
              </div>
              <p className='text-slate-500'>{post.createdAt}</p>
            </div>
            {post.body && <p className='mb-4'>{post.body}</p>}
            {post.image && (
              <img src={post.image} className='rounded-md' alt='' />
            )}

            <Comment singleComment={post.comments[0]} />
          </Link>
          <CreateCommentModal id={post.id} />
        </div>
      ))}
    </>
  );
}
