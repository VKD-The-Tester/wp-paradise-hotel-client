import BACKEND_CLIENT from "./axios";

export const registerRequest = async (name, email, password) => {
  const response = await BACKEND_CLIENT.post("/api/auth/register", {
    name,
    email,
    password,
  });

  return response.data;
};

export const loginRequest = async (email, password) => {
  const response = await BACKEND_CLIENT.post("/api/auth/login", {
    email,
    password,
  });

  return response.data;
};

export const getCurrentUser = async () => {
  try {
    const response = await BACKEND_CLIENT.get("/api/auth/me");

    return response.data.user;
  } catch {
    return null;
  }
};
