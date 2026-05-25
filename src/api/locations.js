import BACKEND_CLIENT from "./axios";

export const getLocations = async (filters = {}) => {
  const response = await BACKEND_CLIENT.get("/api/locations", {
    params: filters,
  });

  return response.data.locations;
};

export const getAvailableRooms = async (filters = {}) => {
  const {
    checkIn,
    checkOut,
    guests = 1,
    search,
    city,
    rating,
    freeParking,
    wellnessCenter,
  } = filters;

  const response = await BACKEND_CLIENT.get("/api/rooms/availability", {
    params: {
      checkIn,
      checkOut,
      guests,
      search,
      city,
      rating,
      freeParking,
      wellnessCenter,
    },
  });

  return response.data.rooms;
};
