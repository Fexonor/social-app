import React from "react";
import style from "./Comment.module.css";

export default function Comment({ singleComment }) {
  if (!singleComment) return null;

  let { createdAt, commentCreator, content } = singleComment;

  return (
    <>
      <div className='w-full mx-auto bg-slate-900 text-slate-200 p-2 my-2 rounded-md'>
        <div className='commentHeader flex justify-between items-center mb-4'>
          <div className='user flex gap-3 items-center'>
            <img
              src={commentCreator.photo}
              className='size-[36px] rounded-full'
              alt=''
            />
            <p>{commentCreator.name}</p>
          </div>
          <span>{createdAt}</span>
        </div>
        <p className='px-6'>{content}</p>
      </div>
    </>
  );
}
