import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getPostDetails } from '../../Api/posts/singlePost.api'
import Loader from '../loader/loader'
import Singlepost from '../singlepost/singlepost'
import CommentItem from '../commentItem/commentItem'


export default function PostDetails() {

  let { id } = useParams()
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['singlePost', id],
    queryFn: () => getPostDetails(id)
  })

  if (isLoading) {
    return (
      <Loader />
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-50">
        <h1 className="text-red-600 text-lg font-semibold bg-white px-6 py-3 rounded-xl shadow-md border border-red-200">
          {error.message}
        </h1>
      </div>
    );
  }
  return (
    <>
      <div className='bg-gray-100 min-h-screen py-6'>
        <div className="card bg-white shadow-lg p-6 max-w-xl mx-auto my-6 rounded-2xl border border-gray-200">

          <Singlepost post={data?.post} />
          <CommentItem post={data?.post} />

        </div>


      </div>
    </>
  )
}
