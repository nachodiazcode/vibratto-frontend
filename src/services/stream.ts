import axios from "./api";

// Obtener todos los streams
export const getAllStreams = async () => {
  const res = await axios.get("/stream");
  return res.data;
};

// Obtener stream por ID
export const getStreamById = async (streamId: string) => {
  const res = await axios.get(`/stream/${streamId}`);
  return res.data;
};

// Crear un nuevo stream
export const createStream = async (data: any) => {
  const res = await axios.post("/stream", data);
  return res.data;
};

// Eliminar un stream
export const deleteStream = async (streamId: string) => {
  const res = await axios.delete(`/stream/${streamId}`);
  return res.data;
};

// Dar like a un stream
export const likeStream = async (streamId: string) => {
  const res = await axios.post(`/stream/${streamId}/like`);
  return res.data;
};

// Buscar streams
export const searchStreams = async (query: string) => {
  const res = await axios.get(`/stream/buscar?q=${query}`);
  return res.data;
};
