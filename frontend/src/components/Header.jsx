import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice.js";
import { NavLink } from "react-router-dom";

export default function Header() {
  const { user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();

  console.log(user);

  return (
    <header className="bg-gray-900 text-white p-4 text-center flex flex-col md:flex-row md:flex md:justify-between gap-3">
      <h1 className="text-xl font-bold whitespace-nowrap">
        <NavLink to="/">Address Book</NavLink>
      </h1>

      <nav className="flex gap-4 justify-center items-center flex-wrap">
        {!user ? (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? "underline" : "")}
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) => (isActive ? "underline" : "")}
            >
              Signup
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/address"
              className={({ isActive }) => (isActive ? "underline " : "")}
            >
              {user.username}'s Addresses
            </NavLink>
            <NavLink
              to="/change-password"
              className={({ isActive }) => (isActive ? " underline" : "")}
            >
              Change Password
            </NavLink>
            <button
              onClick={() => dispatch(logout())}
              className="rounded-md cursor-pointer bg-gray-500 px-2 py-1"
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
