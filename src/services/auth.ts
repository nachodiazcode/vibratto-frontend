import axios from "./api";

export const login = async (email: string, password: string) => {
  const res = await axios.post("/auth/login", { email, password });
  return res.data;
};

export const register = async (formData: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await axios.post("/auth/register", formData);
  return res.data;
};
