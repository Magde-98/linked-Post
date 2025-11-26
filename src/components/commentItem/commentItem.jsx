import { useState, useContext } from 'react';
import commentImg from '../../assets/person.jpg';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getPostComment } from '../../Api/comments/getComment.api';
import { updateCommentApi } from '../../Api/comments/updateComment.api';
import AddComment from '../addComment/addComment';
import DropDownActions from '../dropDownActions/dropDownActions';
import { tokenContext } from '../../context/tokenContext';
import { ClipLoader } from "react-spinners";

export default function CommentItem({ post }) {
  const [showComments, setShowComments] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [updatedValue, setUpdatedValue] = useState('');
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();
  const { userData } = useContext(tokenContext);

  const { data } = useQuery({
    queryKey: ['getPostComment', post._id],
    queryFn: () => getPostComment(post._id),
    select: (data) => data?.comments || [],
  });

  async function handleUpdate(e, commentId) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await updateCommentApi(commentId, updatedValue);
      if (res.message) {
        await queryClient.invalidateQueries(['getPostComment', post._id]);
        setEditingCommentId(null);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Action buttons */}
      <div className="flex justify-around text-gray-600 border-t border-b py-2">
        <button className="flex items-center gap-2 hover:text-blue-500 transition">
          <i className="fa-solid fa-thumbs-up"></i> Like
        </button>
        <button
          className="flex items-center gap-2 hover:text-blue-500 transition"
          onClick={() => setShowComments(!showComments)}
        >
          <i className="fa-solid fa-comment"></i> Comment
        </button>
        <button className="flex items-center gap-2 hover:text-blue-500 transition">
          <i className="fa-solid fa-share"></i> Share
        </button>
      </div>

      {/* Comments section */}
      {showComments && (
        <div className="mt-4">
          {data.map((comment) => (
            <div key={comment._id} className="flex items-start gap-3 mb-4 relative">

              {/* Avatar */}
              <div className="avatar">
                <div className="w-9 h-9 rounded-full ring ring-blue-300 ring-offset-2">
                  <img src={comment.commentCreator.photo.includes(undefined) ? commentImg : comment.commentCreator.photo} alt="Commenter" />
                </div>
              </div>

              {/* Comment box */}
              <div className="bg-gray-100 rounded-2xl p-3 shadow-sm w-full">
                <p className="font-semibold text-sm text-gray-800 mb-1">
                  {comment.commentCreator?.name}
                </p>
                <p className="text-gray-700 text-sm leading-snug mb-2">
                  {comment.content}
                </p>

                {/* Input for update */}
                {editingCommentId === comment._id && (
                  <form
                    onSubmit={(e) => handleUpdate(e, comment._id)}
                    className="flex items-center gap-2 w-full mt-2"
                  >
                    <input
                      type="text"
                      value={updatedValue}
                      onChange={(e) => setUpdatedValue(e.target.value)}
                      className="input input-bordered flex-1 rounded-full px-4 py-2"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full flex items-center justify-center"
                    >
                      {loading ? <ClipLoader color="white" size={22} /> : 'Update'}
                    </button>
                  </form>
                )}
              </div>

             
              {userData?._id === comment.commentCreator?._id && (
                <div className="absolute right-1 top-5">
                  <DropDownActions
                    commentId={comment._id}
                    setEditingCommentId={setEditingCommentId}
                    updatedValue={comment.content}
                    callback={() =>
                      queryClient.invalidateQueries(['getPostComment', post._id])
                    }
                  />
                </div>
              )}
            </div>
          ))}

          {/* Add Comment input */}
          <div className="sticky bottom-0 bg-white py-2">
            <AddComment postId={post._id} post={post} />
          </div>
        </div>
      )}
    </>
  );
}
