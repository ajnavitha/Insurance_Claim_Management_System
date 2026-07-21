import api from "./api";

export const getDashboard = async () => {
  const response = await api.get("/Admin/dashboard");
  return response.data;
};

export const getPolicies = async () => {
  const response = await api.get("/Policy");
  return response.data;
};

export const addPolicy = async (policy) => {
  const response = await api.post("/Policy", policy);
  return response.data;
};

export const updatePolicy = async (id, policy) => {
  const response = await api.put(`/Policy/${id}`, policy);
  return response.data;
};

export const deletePolicy = async (id) => {
  const response = await api.delete(`/Policy/${id}`);
  return response.data;
};

export const getClaims = async () => {
  const response = await api.get("/Admin/claims");
  return response.data;
};
export const getUsers = async () => {
  const response = await api.get("/Admin/users");
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/Admin/user/${id}`);
  return response.data;
};
export const getPolicyById = async (id) => {
  const response = await api.get(`/Policy/${id}`);
  return response.data;
};