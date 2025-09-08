import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addTreatment } from "../features/treatments/treatmentSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_BASE_URL from "../config/api";

export default function AddTreatmentModal({ onClose }) {
  const [catalog, setCatalog] = useState([]);
  const dispatch = useDispatch();
  const { error } = useSelector((s) => s.treatments);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/catalog`).then((res) => setCatalog(res.data));
  }, []);

  const handleAdd = (t) => {
    dispatch(addTreatment(t));

    if (error) {
      toast.error(error); // show error toast (duplicate treatment, etc.)
    } else {
      toast.success(`${t.name} added successfully`);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6 animate-fade-in">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Select Treatment</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            ✕
          </button>
        </div>

        {/* Treatment List */}
        <ul className="space-y-3 max-h-60 overflow-y-auto pr-2">
          {catalog.map((t) => (
            <li
              key={t.id}
              className="flex justify-between items-center border-b pb-2 last:border-none"
            >
              <span className="text-gray-700">{t.name}</span>
              <button
                onClick={() => handleAdd(t)}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
              >
                Add
              </button>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            Close
          </button>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}
