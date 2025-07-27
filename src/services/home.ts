import axios from "./api";

export const getUpcomingEvents = async () => {
  const res = await axios.get("/events/semana");
  return res.data;
};

export const getActiveCollabs = async () => {
  const res = await axios.get("/collabs/activas");
  return res.data;
};

export const getRecommendations = async () => {
  const res = await axios.get("/recomendaciones");
  return res.data;
};
