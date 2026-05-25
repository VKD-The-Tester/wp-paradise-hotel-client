import BACKEND_CLIENT from "./axios";

export const createReservation = async (payload) => {
  try {
    const response = await BACKEND_CLIENT.post("/api/reservations", payload);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getMyReservations = async () => {
  const response = await BACKEND_CLIENT.get("/api/reservations/me");

  return response.data.reservations;
};

export const cancelReservation = async (id) => {
  try {
    const response = await BACKEND_CLIENT.delete(`/api/reservations/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
