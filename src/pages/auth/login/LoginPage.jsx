import { useActionState, useEffect } from "react";
import { login } from "./actions";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/useAuth";

const initialState = {};

const LoginPage = () => {
  const navigate = useNavigate();

  const { login: setAuthUser } = useAuth();

  const [state, loginAction, isPending] = useActionState(login, initialState);

  useEffect(() => {
    if (state?.success) {
      setAuthUser(state.user);

      navigate("/");
    }
  }, [state, navigate, setAuthUser]);

  return (
    <div>
      <h2>Login</h2>
      <form action={loginAction}>
        <label htmlFor="login-email">Email:</label>
        <input
          type="email"
          id="login-email"
          name="email"
          placeholder="user@example.com"
        />
        {state?.errors?.email && <p>{state.errors.email[0]}</p>}

        <label htmlFor="login-password">Password:</label>
        <input
          type="password"
          id="login-password"
          name="password"
          placeholder="123456"
        />
        {state?.errors?.password && <p>{state.errors.password[0]}</p>}

        <button disabled={isPending}>
          {isPending ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
