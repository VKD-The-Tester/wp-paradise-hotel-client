import BACKEND_CLIENT from "./axios";

export const getDashboardStats = async () => {
  const response = await BACKEND_CLIENT.get("api/admin/dashboard");

  return response.data;
};

export const getAllReservations = async () => {
  const response = await BACKEND_CLIENT.get("api/admin/reservations");

  return response.data.reservations;
};

export const getAdminLocations = async () => {
  const response = await BACKEND_CLIENT.get("/api/admin/locations");

  return response.data.locations;
};

export const createLocation = async (payload) => {
  const response = await BACKEND_CLIENT.post("/api/admin/locations", payload);

  return response.data;
};

export const updateLocation = async (id, payload) => {
  const response = await BACKEND_CLIENT.put(
    `/api/admin/locations/${id}`,
    payload,
  );
  return response.data;
};

export const deleteLocation = async (id) => {
  const response = await BACKEND_CLIENT.delete(`/api/admin/locations/${id}`);

  return response.data;
};
