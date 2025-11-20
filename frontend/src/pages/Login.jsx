import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/authSlice.js";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loginSuccess, loading } = useSelector((s) => s.auth);

  useEffect(() => {
    if (loginSuccess) {
      navigate("/");
    }
  }, [loginSuccess]);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  const handleLogin = () => {
    dispatch(loginUser(data));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input
        className="border p-2 w-full mb-3"
        placeholder="Email"
        type="email"
        required
        onChange={(e) => setData({ ...data, email: e.target.value })}
      />
      <input
        className="border p-2 w-full mb-3"
        type="password"
        placeholder="Password"
        onChange={(e) => setData({ ...data, password: e.target.value })}
      />
      <button
        onClick={handleLogin}
        className="bg-gray-900 cursor-pointer text-white p-2 w-full"
      >
        {loading ? "Loading..." : "Login"}
      </button>
    </div>
  );
}
