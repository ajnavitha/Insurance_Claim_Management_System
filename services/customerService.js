import api from "./api";

export const getProfile = async () => {
    const response = await api.get("/Customer/profile");
    return response.data;
};

export const getMyClaims = async () => {
    const response = await api.get("/Claim");
    return response.data;
};

export const getNotifications = async () => {
    const response = await api.get("/Notification");
    return response.data;
};

export const getPolicies = async () => {
    const response = await api.get("/Policy");
    return response.data;
};

export const getPayments = async () => {
    const response = await api.get("/Payment");
    return response.data;
};