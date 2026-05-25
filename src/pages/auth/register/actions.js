import { registerSchema } from "../../../schemas/authSchema";
import { registerRequest } from "../../../api/auth";

export const register = async (prevState, formData) => {
  const result = await registerSchema.safeParseAsync(
    Object.fromEntries(formData),
  );

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const { name, email, password } = result.data;

  const response = await registerRequest(name, email, password);

  const user = response.user;

  return {
    message: "User successfully registered",
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};
