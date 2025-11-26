import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { createPosts } from '../../Api/posts/createPost.Api'
import toast from 'react-hot-toast'


export default function CreatePost() {

  const [body, setBody] = useState('')
  const [image, setImage] = useState('')
  const [imgSrc, setImgSrc] = useState('')
  const queryClient = useQueryClient()

  // get
  const { data, mutate, isPending, error, isError, isSuccess } = useMutation({
    mutationFn: (data) => createPosts(data),
    onSuccess: () => {
      toast.success('post Added Successfully !')
      queryClient.invalidateQueries({
        queryKey: ['profile']
      })
      queryClient.invalidateQueries({
        queryKey: ['allPosts']
      })
    }
  })
  useEffect(() => {
  if (isPending) {
    toast.loading('Loading...', { id: 'create-post' });
  } else {
    toast.dismiss('create-post');
  }
}, [isPending]);


  function handleAddPost() {
    const formData = new FormData();

    if (body) {
      formData.append('body', body)
    }
    if (image) {
      formData.append('image', image)
    }
    mutate(formData);
  }

  function handleChange(e) {
    console.log(e.target.files[0])
    const file = e.target.files[0];
    setImage(file)
    setImgSrc(URL.createObjectURL(file))
  }


  return (
    <>
      
      <div className="max-w-xl mx-auto mt-10">
        <div className="bg-white shadow-lg p-6 rounded-2xl border border-gray-200">

          <textarea
            className="w-full textarea textarea-bordered rounded-xl resize-none text-gray-700"
            rows="4"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="What's on your mind?"
          ></textarea>

          {/* Image Preview */}
          <div id="imagePreview" className="mt-4 hidden">
            <div className="relative rounded-xl overflow-hidden border">
              <img
                src="https://via.placeholder.com/400x200"
                className="w-full h-52 object-cover"
                alt="preview"
              />

              <button
                className="absolute top-2 right-2 bg-white text-gray-600 w-8 h-8 flex justify-center items-center rounded-full shadow hover:bg-red-500 hover:text-white transition"
              >
                ✕
              </button>
            </div>
          </div>

          {imgSrc && (
            <div className="relative w-full mt-4">
              <img
                src={imgSrc}
                alt="preview"
                className="w-full h-52 object-cover rounded-xl border"
              />


              {/* Remove Image Button */}
              <button
                onClick={() => {
                  setImage('');
                  setImgSrc('');
                }}
                className="absolute top-2 right-2 w-9 h-9 rounded-full bg-white shadow flex justify-center items-center hover:bg-red-500 hover:text-white transition"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          )}



          {/* Bottom buttons */}
          <div className="flex justify-between items-center mt-5">

            {/* Upload image button */}
            <label className="cursor-pointer">
              <input onChange={handleChange} type="file" accept="image/*" className="hidden" />
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shadow hover:bg-gray-200 transition">
                <i className="fa-solid fa-image text-blue-500 text-lg"></i>
              </div>
            </label>

            
            <button onClick={handleAddPost} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold shadow">
              Post
            </button>
          </div>

        </div>
      </div>

    </>
  )
}
