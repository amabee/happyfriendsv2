import axios from "axios";

const POSTS_ENDPOINT = process.env.NEXT_PUBLIC_POSTS_ENDPOINT;

export const createPost = async ({ formData }) => {
  try {
    const res = await axios({
      url: POSTS_ENDPOINT,
      method: "POST",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
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
        data: null,
      };
    } else {
      return { success: false, message: JSON.stringify(res.data), data: null };
    }
  } catch (e) {
    return { success: false, message: e, data: null };
  }
};

export const getPosts = async ({ userID }) => {
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

export const likePost = async ({ formData }) => {
  try {
    const res = await axios({
      url: POSTS_ENDPOINT,
      method: "POST",
      data: formData,
    });

    if (res.status !== 200) {
      return { success: false, message: res.statusText, data: null };
    }

    if (res.data.success == true) {
      return { success: true, message: "You liked this post", data: null };
    } else {
      return {
        success: false,
        message: "Something went wrong while reacting the post",
        data: null,
      };
    }
  } catch (e) {
    return { success: false, message: e, data: null };
  }
};

export const getUserReactions = async (userID) => {
  try {
    const res = await axios.get(POSTS_ENDPOINT, {
      params: {
        operation: "getUserReactions",
        json: JSON.stringify({
          user_id: userID,
        }),
      },
    });

    if (res.status !== 200) {
      return { success: false, message: "Status Error", data: null };
    }

    if (res.data.success) {
      return {
        success: true,
        message: "Got Data",
        data: res.data.success,
      };
    } else {
      return {
        success: false,
        message: "",
        data: null,
      };
    }
  } catch (error) {
    return { success: false, message: error, data: null };
  }
};

export const updateReaction = async ({ formData }) => {
  try {
    const res = await axios({
      url: POSTS_ENDPOINT,
      method: "POST",
      data: formData,
    });

    if (res.status !== 200) {
      return { success: false, message: res.statusText, data: null };
    }

    if (res.data.success) {
      return { success: true, message: res.data.success, data: null };
    } else {
      return {
        success: false,
        message: res.data.error,
        data: null,
      };
    }
  } catch (error) {
    return { success: false, message: "Exception Error", data: null };
  }
};

export const removeReaction = async ({ formData }) => {
  try {
    const res = await axios({
      url: POSTS_ENDPOINT,
      method: "POST",
      data: formData,
    });

    if (res.status !== 200) {
      return { success: false, message: res.statusText, data: null };
    }

    if (res.data.success) {
      return { success: true, message: res.data.success, data: null };
    } else {
      return { success: false, message: res.data.error, data: null };
    }
  } catch (error) {
    return { success: false, message: "Exception Error", data: null };
  }
};
