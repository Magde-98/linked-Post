import { useQuery, useQueryClient } from '@tanstack/react-query';
import Loader from '../loader/loader';
import Singlepost from '../singlepost/singlepost';
import CommentItem from '../commentItem/commentItem';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../../Api/posts/allPosts.api';
import CreatePost from '../createPost/createPost';
import DropDownActions from '../dropDownActions/dropDownActions';
import { useContext } from 'react';
import { tokenContext } from '../../context/tokenContext';
import DropDownActionsPost from '../DropDownActionsPost/DropDownActionsPost';

export default function Home() {
  const { userData } = useContext(tokenContext);
  const queryClient = useQueryClient();

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ['allPosts'],
    queryFn: getAllPosts
  });

  console.log(data?.posts);

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-50">
        <h1 className="text-red-600 text-lg font-semibold bg-white px-6 py-3 rounded-xl shadow-md border border-red-200">
          {error.message}
        </h1>
      </div>
    );
  }

  if (isLoading) return <Loader />;

  return (
    <div className="bg-gray-100 min-h-screen py-6">
      <CreatePost />
      {data?.posts.map((post, index) => (
        <div
          key={index}
          className="card bg-white shadow-lg p-6 max-w-xl mx-auto my-6 rounded-2xl border border-gray-200 relative"
        >
          
          {userData?._id === post.user?._id && (
            <div className="absolute top-4 right-4">
              <DropDownActionsPost
                type="post"
                postId={post._id}
                callback={() => queryClient.invalidateQueries(['allPosts'])} 
              />
            </div>
          )}

          <Link to={`postDetails/${post._id}`}>
            <Singlepost post={post} />
          </Link>

          <CommentItem post={post} />
        </div>
      ))}
    </div>
  );
}
