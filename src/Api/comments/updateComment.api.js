import axios from "axios";

export async function updateCommentApi(commentId,content) {
  try {
    const { data } = await axios.put(
      `https://linked-posts.routemisr.com/comments/${commentId}`,{
        content
      },
      {
        headers: {
          token: localStorage.getItem("token")
        }
      }
    );

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
