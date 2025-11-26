import axios from "axios";

export async function deleteCommentApi(commentId) {
  try {
    const { data } = await axios.delete(
      `https://linked-posts.routemisr.com/comments/${commentId}`,
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
