import axios from "./api";

// Obtener todos los posts
export const getAllPosts = async () => {
  const res = await axios.get("/blog");
  return res.data;
};

// Obtener un post por ID
export const getPostById = async (postId: string) => {
  const res = await axios.get(`/blog/${postId}`);
  return res.data;
};

// Crear un nuevo post
export const createPost = async (formData: FormData) => {
  const res = await axios.post("/blog", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// Comentar un post
export const commentOnPost = async (postId: string, comentario: string) => {
  const res = await axios.post(`/blog/${postId}/comentarios`, { comentario });
  return res.data;
};

// Dar like a un post
export const toggleLike = async (postId: string) => {
  const res = await axios.post(`/blog/${postId}/like`);
  return res.data;
};

// Eliminar un post
export const deletePost = async (postId: string) => {
  const res = await axios.delete(`/blog/${postId}`);
  return res.data;
};
