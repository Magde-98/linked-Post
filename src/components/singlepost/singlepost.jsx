import React, { useContext } from 'react';
import postImg from '../../assets/work-5.jpg';
import { tokenContext } from '../../context/tokenContext';
import { useQueryClient } from '@tanstack/react-query';

import DropDownActionsPost from '../DropDownActionsPost/DropDownActionsPost';

export default function Singlepost({ post }) {
  const { userData } = useContext(tokenContext);
  const queryClient = useQueryClient();


  return (
    <div className="relative">
      
      {userData?._id === post.user?._id && (
        <div className="absolute top-2 right-0">
          <DropDownActionsPost
            type="post"
            postId={post._id}
            callback={() => queryClient.invalidateQueries(['allPosts'])} 
          />
        </div>
      )}

      
      <div className="flex items-center gap-3 mb-3">
        <div className="avatar">
          <div className="w-12 h-12 rounded-full ring ring-blue-300 ring-offset-2">
            <img
              src={post?.user?.photo ? post.user.photo : 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'}
              alt="User"
            />
          </div>
        </div>

        <div>
          <p className="font-semibold text-gray-800">{post?.user?.name}</p>
          <p className="text-sm text-gray-400">{post?.createdAt}</p>
        </div>
      </div>

      <p className="mb-4 text-gray-700 text-base">{post?.body}</p>

      <img
        src={post.image ? post.image : postImg}
        className="rounded-lg mb-4 w-full object-cover"
        alt="Post"
      />
    </div>
  );
}
