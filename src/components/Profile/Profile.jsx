import React, { useContext } from 'react'
import { tokenContext } from '../../context/tokenContext'
import { getUserPost } from '../../Api/posts/getUserPost.api';
import Loader from '../loader/loader';
import { useQuery } from '@tanstack/react-query';
import Singlepost from '../singlepost/singlepost';
import CommentItem from '../commentItem/commentItem';
import CreatePost from '../createPost/createPost';

export default function Profile() {
  const { userData } = useContext(tokenContext);

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ['profile', userData?._id],
    queryFn: () => getUserPost(userData?._id),
    enabled: !!userData?._id
  })

  console.log("User posts: ", data);

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-50">
        <h1 className="text-red-600 text-lg font-semibold bg-white px-6 py-3 rounded-xl shadow-md border border-red-200">
          {error.message}
        </h1>
      </div>
    );
  }

  if (isLoading) {
    return (
      <Loader />
    );
  }


  return (
    <>
      <div className='bg-gray-100 min-h-screen py-6'>
        <div className="flex justify-center items-center min-h-[80vh] bg-gray-50">
          <div className="bg-white shadow-xl rounded-2xl p-8 w-[90%] max-w-md text-center">

            <div className="flex justify-center mb-6">
              <img
                src={userData?.photo ? userData?.photo : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                alt="User profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-sky-500 shadow-md"
              />
            </div>


            <h2 className="text-2xl font-semibold text-sky-700 mb-2">
              {userData?.name || "Unknown User"}
            </h2>


            <p className="text-gray-600 mb-4">
              {userData?.email || "No email available"}
            </p>


            <div className="border-t border-gray-200 my-4"></div>


            <p className="text-sm text-gray-500">
              Welcome to your profile page
            </p>
          </div>

        </div>
        <CreatePost />
        <div className="max-w-xl mx-auto my-6 space-y-6">
          {data?.posts?.map((post) => (
            <div
              key={post._id}
              className="card bg-white shadow-lg p-6 rounded-2xl border border-gray-200"
            >
              <Singlepost post={post} />
              <CommentItem post={post} />
            </div>
          ))}
        </div>

      </div>
    </>
  )
}
