import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function UserPosts({ id }) {
  function getUserPosts() {
    return axios.get(
      `https://linked-posts.routemisr.com/users/${id}/posts?limit=2`,
      {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      }
    );
  }

  let { data, isError } = useQuery({
    queryKey: ["userPosts"],
    queryFn: getUserPosts,
    select : (data)=> data?.data?.posts
  });

  console.log(data);

  return <div>UserPosts</div>;
}
