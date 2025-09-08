import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTreatments,
  deleteTreatment,
} from "../features/treatments/treatmentSlice";
import AddTreatmentModal from "../components/AddTreatmentModal";
import Header from "../components/Header";

export default function TreatmentListPage() {
  const dispatch = useDispatch();
  const treatments = useSelector((s) => s.treatments.list);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchTreatments());
  }, [dispatch]);

  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto mt-10 bg-white rounded-2xl shadow-lg p-6">
        {/* Header row */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Treatments</h2>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            onClick={() => setShowModal(true)}
          >
            + Add
          </button>
        </div>

        {/* Treatments list */}
        {treatments.length === 0 ? (
          <p className="text-gray-500 text-center py-10">
            No treatments available. Click <span className="font-semibold">Add</span> to add one.
          </p>
        ) : (
          <ul className="space-y-3">
            {treatments.map((t) => (
              <li
                key={t.id}
                className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <span className="text-gray-700">{t.name}</span>
                <button
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  onClick={() => dispatch(deleteTreatment(t.id))}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Add Treatment Modal */}
      {showModal && <AddTreatmentModal onClose={() => setShowModal(false)} />}
    </>
  );
}
