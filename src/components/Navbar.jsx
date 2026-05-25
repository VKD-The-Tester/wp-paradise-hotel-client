import { NavLink } from "react-router-dom";

import { useAuth } from "../context/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();

  const isAuthenticated = !!user;

  const isAdmin = user?.role === "admin";

  return (
    <nav>
      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        {!isAuthenticated && (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}

        {isAuthenticated && (
          <>
            <NavLink to="/reservations">My Reservations</NavLink>
            {isAdmin && (
              <div>
                <NavLink to="/admin/dashboard">Dashboard</NavLink>
                <NavLink to="/admin/locations">Manage Locations</NavLink>
                <NavLink to="/admin/reservations">Manage Reservations</NavLink>
              </div>
            )}
            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
