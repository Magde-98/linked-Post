import axios from "axios";


const token = localStorage.getItem('token');

export async function getPostComment(postId) {

    const { data } = await axios.get(`https://linked-posts.routemisr.com/posts/${postId}/comments`, {
        headers: {
            token: token
        }
    })

    return data;
}