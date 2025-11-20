import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function Home() {
  const { user } = useSelector((s) => s.auth);
  return (
    <>
      <div className="p-10 text-center text-xl">
        <h1 className="py-10 text-center text-4xl font-bold mb-4">
          Welcome to "Address Book"
        </h1>
        {!user ? (
          <div>
            Please{" "}
            <NavLink to="/login" className="text-blue-700 underline">
              login
            </NavLink>{" "}
            to view your addresses.
          </div>
        ) : (
          <div>
            <NavLink
              to="/address"
              className="bg-gray-900 cursor-pointer text-white px-4 py-2 w-full disabled:opacity-50"
            >
              My Addresses
            </NavLink>
          </div>
        )}
      </div>
    </>
  );
}
