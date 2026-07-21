import api from "./api";

export const getPolicies = async () => {
  const response = await api.get("/Policy");
  return response.data;
};

export const getPolicyById = async (id) => {
  const response = await api.get(`/Policy/${id}`);
  return response.data;
};