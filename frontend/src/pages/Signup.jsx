import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [data, setData] = useState({ username: "", email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { registerSuccess, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (registerSuccess) {
      navigate("/login");
    }
  }, [registerSuccess]);

  const handleSignup = () => {
    dispatch(registerUser(data));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      <input
        className="border p-2 w-full mb-3"
        placeholder="Name"
        onChange={(e) => setData({ ...data, username: e.target.value })}
        required
      />
      <input
        className="border p-2 w-full mb-3"
        placeholder="Email"
        type="email"
        required
        onChange={(e) => setData({ ...data, email: e.target.value })}
      />
      <input
        required
        className="border p-2 w-full mb-3"
        type="password"
        placeholder="Password"
        onChange={(e) => setData({ ...data, password: e.target.value })}
      />
      <button
        onClick={handleSignup}
        disabled={loading}
        className="bg-gray-900 cursor-pointer text-white p-2 w-full disabled:opacity-50"
      >
        {loading ? "Creating Account..." : "Signup"}
      </button>
    </div>
  );
}
