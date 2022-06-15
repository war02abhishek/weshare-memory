import axios from 'axios';



const API = axios.create({ baseURL: "https://sm-memory.herokuapp.com/" });
// --> https://sm-memory.herokuapp.com/

//our middleware will not work if we not include this
https: API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});



export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) =>API.post('/posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);



// PUT is a method of modifying resource where the client sends data that updates the entire resource . PATCH is a method of modifying resources where the client sends partial data that is to be updated without modifying the entire data









