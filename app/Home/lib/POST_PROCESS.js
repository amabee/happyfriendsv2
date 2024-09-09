import axios from "axios";

const POSTS_ENDPOINT = process.env.NEXT_PUBLIC_POSTS_ENDPOINT;

export const createPost = async ({ formData }) => {
  try {
    const res = await axios({
      url: POSTS_ENDPOINT,
      method: "POST",
      data: formData,
    });

    if (res.status !== 200) {
      return {
        success: false,
        message: "Status Error: " + res.statusText,
        data: null,
      };
    }

    if (res.data.success === true) {
      return {
        success: true,
        message: "Post Submitted",
        data: res.data.success,
      };
    } else {
      return { success: false, message: res.data.message, data: null };
    }
  } catch (e) {
    return { success: false, message: e, data: null };
  }
};

export const getPosts = async ({userID}) => {
  try {
    const res = await axios.get(POSTS_ENDPOINT, {
      params: {
        operation: "readPosts",
        json: JSON.stringify({
          current_user_id: userID,
        }),
      },
    });

    if (res.status !== 200) {
      return {
        success: false,
        message: "Status Error: " + res.statusText,
        data: null,
      };
    }

    if (res.data.success === true) {
      return {
        success: true,
        message: JSON.stringify(res.data),
        data: res.data.data,
      };
    } else {
      return { success: false, message: JSON.stringify(res.data), data: null };
    }
  } catch (error) {
    return { success: false, message: e, data: null };
  }
};
