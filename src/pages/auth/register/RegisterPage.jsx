import { useActionState } from "react";
import { register } from "./actions";

const RegisterPage = () => {
  const [state, registerAction, isPending] = useActionState(register, null);
  return (
    <div>
      <h2>Register</h2>
      <form action={registerAction}>
        <label htmlFor="register-name">Name:</label>
        <input
          type="text"
          id="register-name"
          name="name"
          placeholder="Full Name"
        />
        {state?.errors?.name && <p>{state.errors.name[0]}</p>}

        <label htmlFor="register-email">Email:</label>
        <input
          type="email"
          id="register-email"
          name="email"
          placeholder="user@example.com"
        />
        {state?.errors?.email && <p>{state.errors.email[0]}</p>}

        <label htmlFor="register-password">Password:</label>
        <input
          type="password"
          id="register-password"
          name="password"
          placeholder="123456"
        />
        {state?.errors?.password && <p>{state.errors.password[0]}</p>}

        <button type="submit" disabled={isPending}>
          Register
        </button>
        {isPending && <p>Loading...</p>}
      </form>
    </div>
  );
};

export default RegisterPage;
