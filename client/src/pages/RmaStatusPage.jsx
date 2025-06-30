import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RmaStatusPage = () => {
  const { rma } = useParams();
  const [statusInfo, setStatusInfo] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5001/api/rma/status/${rma}`
        );
        setStatusInfo(res.data);
      } catch (err) {
        setError("RMA kodas nerastas arba įvyko klaida.");
      }
    };

    fetchStatus();
  }, [rma]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-xl p-6 sm:p-10 w-full max-w-xl">
        <h1 className="text-2xl font-bold text-center text-[#0056A0] mb-6">
          🔍 RMA statuso peržiūra
        </h1>

        {error && (
          <div className="text-red-600 text-center text-sm mb-4">{error}</div>
        )}

        {statusInfo && (
          <div className="space-y-3 text-center">
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
    </div>
  );
};

export default RmaStatusPage;
