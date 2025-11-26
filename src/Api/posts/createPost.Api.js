import axios from "axios";

const token = localStorage.getItem("token");

export async function createPosts(formData) {
    const { data } = await axios.post(
        "https://linked-posts.routemisr.com/posts",
        formData,
        {
            headers: {
                token: token
            }
        }
    );

    return data;
}
