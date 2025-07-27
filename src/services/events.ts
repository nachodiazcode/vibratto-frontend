import axios from "./api";

// Obtener todos los eventos
export const getAllEvents = async () => {
  const res = await axios.get("/events");
  return res.data;
};

// Obtener evento por ID
export const getEventById = async (eventId: string) => {
  const res = await axios.get(`/events/${eventId}`);
  return res.data;
};

// Crear un nuevo evento
export const createEvent = async (data: any) => {
  const res = await axios.post("/events", data);
  return res.data;
};

// Actualizar un evento
export const updateEvent = async (eventId: string, data: any) => {
  const res = await axios.put(`/events/${eventId}`, data);
  return res.data;
};

// Eliminar un evento
export const deleteEvent = async (eventId: string) => {
  const res = await axios.delete(`/events/${eventId}`);
  return res.data;
};

// Obtener eventos de la semana (dashboard)
export const getUpcomingEvents = async () => {
  const res = await axios.get("/events/semana");
  return res.data;
};

// Reservar un evento
export const reserveEvent = async (eventId: string) => {
  const res = await axios.post(`/events/${eventId}/reservar`);
  return res.data;
};

// Cancelar reserva
export const cancelReservation = async (eventId: string) => {
  const res = await axios.delete(`/events/${eventId}/reservar`);
  return res.data;
};
