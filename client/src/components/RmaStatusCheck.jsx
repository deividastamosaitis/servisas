import React, { useState } from "react";
import axios from "axios";

const RmaStatusCheck = () => {
  const [rma, setRma] = useState("");
  const [statusInfo, setStatusInfo] = useState(null);
  const [error, setError] = useState("");

  const handleCheck = async (e) => {
    e.preventDefault();
    setStatusInfo(null);
    setError("");

    if (!rma.trim()) {
      setError("Įveskite RMA kodą.");
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:5001/api/rma/status/${rma.trim()}`
      );
      setStatusInfo(res.data);
    } catch (err) {
      setError("RMA kodas nerastas arba įvyko klaida.");
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-xl mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4 text-center">
        🔍 RMA statuso patikra
      </h2>

      <form onSubmit={handleCheck} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Įveskite RMA kodą"
          value={rma}
          onChange={(e) => setRma(e.target.value)}
          className="flex-grow border rounded-md p-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Tikrinti
        </button>
      </form>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      {statusInfo && (
        <div className="bg-gray-50 p-4 rounded-md border mt-4">
          <p>
            <strong>RMA kodas:</strong> {statusInfo.rmaCode}
          </p>
          <p>
            <strong>Klientas:</strong> {statusInfo.clientName}
          </p>
          <p>
            <strong>Būsena:</strong> {statusInfo.status}
          </p>
          <p>
            <strong>Užregistruota:</strong>{" "}
            {new Date(statusInfo.receivedDate).toLocaleDateString("lt-LT")}
          </p>
        </div>
      )}
    </div>
  );
};

export default RmaStatusCheck;
