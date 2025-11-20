import { useDispatch } from "react-redux";
import { changePassword } from "../store/authSlice.js";
import { useState } from "react";

export default function ChangePassword() {
  const [data, setData] = useState({ oldPassword: "", newPassword: "" });
  const dispatch = useDispatch();

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow">
      <h2 className="text-2xl font-bold mb-4">Change Password</h2>
      <input
        className="border p-2 w-full mb-3"
        placeholder="Old Password"
        type="password"
        onChange={(e) => setData({ ...data, oldPassword: e.target.value })}
      />
      <input
        className="border p-2 w-full mb-3"
        placeholder="New Password"
        type="password"
        onChange={(e) => setData({ ...data, newPassword: e.target.value })}
      />
      <button
        onClick={() => dispatch(changePassword(data))}
        className="bg-gray-900 cursor-pointer text-white p-2 w-full"
      >
        Update Password
      </button>
    </div>
  );
}
