import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { createComment } from '../../Api/comments/createComment.api'
import toast from 'react-hot-toast'

export default function AddComment({ postId, post }) {
  const [content, setContent] = useState('')
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      toast.success('Comment added successfully', { duration: 3000 })
      setContent('')
      queryClient.invalidateQueries(['getPostComment', postId])
    },
    onError: () => {
      toast.error('There was an error')
    }
  })

  function addComment() {
    if (content.trim()) {
      mutate({
        content: content,
        post: postId
      })
    }
  }

  return (
    <div className="flex items-center gap-3 mt-4 bg-gray-50 rounded-2xl p-3 shadow-sm">
      <div className="avatar">
        <div className="w-9 h-9 rounded-full ring ring-blue-300 ring-offset-2">
          <img
            src={post?.user?.photo || '/default-user.png'}
            alt="User Avatar"
          />
        </div>
      </div>

      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a comment..."
        className="flex-1 input input-bordered rounded-full px-4 py-2"
      />

      <button
        onClick={addComment}
        disabled={isPending}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full"
      >
        <i className="fa-solid fa-paper-plane"></i>
      </button>
    </div>
  )
}
