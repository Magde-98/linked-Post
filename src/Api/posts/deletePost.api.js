import axios from "axios";

export async function deletePostApi(postId) {
  try {
    const { data } = await axios.delete(
      `https://linked-posts.routemisr.com/posts/${postId}`, 
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
