import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAddresses,
  addAddress,
  deleteAddress,
  updateAddress,
} from "../store/addressSlice.js";

export default function AddressPage() {
  const dispatch = useDispatch();
  const { list } = useSelector((s) => s.address);

  const [form, setForm] = useState({
    name: "",
    contact_email: "",
    contact: "",
    address: "",
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(fetchAddresses());
  }, []);

  const handleSubmit = () => {
    if (!form.name || !form.contact_email || !form.contact || !form.address) {
      alert("All fields are required");
      return;
    }

    if (editId) {
      dispatch(updateAddress({ id: editId, data: form }));
    } else {
      dispatch(addAddress(form));
    }

    setForm({ name: "", contact_email: "", contact: "", address: "" });
    setEditId(null);
  };

  return (
    <div className="max-w-4xl mx-auto pt-10 pb-20 px-[20px]">
      <h1 className="text-5xl font-light text-center mb-10">Address Book</h1>

      <div className="border rounded p-5 shadow-md mb-10">
        <h2 className="text-2xl font-semibold mb-4">
          {editId ? "Edit Address" : "Add New Address"}
        </h2>

        <input
          className="border p-2 w-full mb-3 rounded"
          placeholder="Full Name"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="border p-2 w-full mb-3 rounded"
          placeholder="Email"
          type="email"
          required
          value={form.contact_email}
          onChange={(e) => setForm({ ...form, contact_email: e.target.value })}
        />

        <input
          className="border p-2 w-full mb-3 rounded"
          placeholder="Contact Number"
          type="number"
          required
          value={form.contact}
          onChange={(e) => setForm({ ...form, contact: e.target.value })}
        />

        <textarea
          className="border p-2 w-full mb-3 rounded"
          placeholder="Complete Address"
          rows="3"
          required
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        <button
          onClick={handleSubmit}
          className="bg-gray-900 text-white p-2 w-full rounded hover:bg-gray-800 cursor-pointer"
        >
          {editId ? "Update Address" : "Add Address"}
        </button>
      </div>

      <div className="space-y-4">
        {list?.map((a) => (
          <div key={a._id} className="border rounded-lg p-4 shadow-sm bg-white">
            <p className="font-semibold text-lg">Name : {a.name}</p>
            <p>Email : {a.contact_email}</p>
            <p>Contact : {a.contact}</p>
            <p>Address : {a.address}</p>

            <div className="flex gap-4 mt-3 text-xs">
              <button
                className="bg-red-600 text-white hover:bg-red-800 cursor-pointer rounded px-2 py-1"
                onClick={() => dispatch(deleteAddress(a._id))}
              >
                Delete
              </button>

              <button
                className="bg-gray-900 text-white hover:bg-gray-700 cursor-pointer rounded px-2 py-1"
                onClick={() => {
                  setForm(a);
                  setEditId(a._id);
                }}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
