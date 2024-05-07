import { createSlice } from "@reduxjs/toolkit";

const getPostsFromLocalStorage = () => {
  const postsJson = localStorage.getItem("posts-HggTNRuQbO");
  return postsJson ? JSON.parse(postsJson) : [];
};

const updatePostsInLocalStorage = (posts) => {
  localStorage.setItem("posts-HggTNRuQbO", JSON.stringify(posts));
};

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: getPostsFromLocalStorage(),
  },
  reducers: {
    createPost: (state, action) => {
      state.posts.push(action.payload);
      updatePostsInLocalStorage(state.posts);
    },
    editPost: (state, action) => {
      const { id } = action.payload;
      const existingPost = state.posts.find((post) => post.id === id);
      if (existingPost) {
        Object.assign(existingPost, action.payload);
        updatePostsInLocalStorage(state.posts);
      }
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
      updatePostsInLocalStorage(state.posts);
    },
  },
});

export const { createPost, editPost, deletePost } = postSlice.actions;

export default postSlice.reducer;
