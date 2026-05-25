import { loginSchema } from "../../../schemas/authSchema";
import { loginRequest } from "../../../api/auth";

export const login = async (prevState, formData) => {
  const result = await loginSchema.safeParseAsync(Object.fromEntries(formData));

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const { email, password } = result.data;

  const response = await loginRequest(email, password);

  const { token, user } = response;

  localStorage.setItem("token", token);

  return {
    token,
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};
