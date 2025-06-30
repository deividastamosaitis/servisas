import React, { useState } from "react";
import axios from "axios";

const RmaForm = () => {
  const [form, setForm] = useState({});
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [confirmedLabel, setConfirmedLabel] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!acceptedTerms || !confirmedLabel) {
      setErrorMessage("Turite pažymėti abi varneles.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        client: {
          name: form["client.name"],
          phone: form["client.phone"],
          email: form["client.email"],
        },
        product: {
          category: form["product.category"],
          brand: form["product.brand"],
          model: form["product.model"],
          serialNumber: form["product.serialNumber"],
        },
        problemDescription: form.problemDescription,
      };

      // Sukuriam FormData objektą
      const formData = new FormData();
      formData.append("data", JSON.stringify(payload));

      files.forEach((file) => {
        formData.append("files", file);
      });

      const res = await axios.post(
        "http://localhost:5001/api/rma/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccessMessage(
        `✅ Registracija sėkminga! Jūsų RMA kodas: ${res.data.rmaCode}`
      );
      setForm({});
      setFiles([]);
      setAcceptedTerms(false);
      setConfirmedLabel(false);
    } catch (err) {
      console.error("🔴 KLAIDA:", err.response?.data || err.message);
      setErrorMessage("❌ Klaida registruojant. Bandykite vėliau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Garantinio remonto registracija
        </h2>

        {successMessage && (
          <div className="bg-green-100 text-green-800 px-4 py-3 mb-4 rounded-md font-medium">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="bg-red-100 text-red-800 px-4 py-3 mb-4 rounded-md font-medium">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-4">
          <select
            name="product.category"
            value={form["product.category"] || ""}
            onChange={handleChange}
            required
            className="p-2 border rounded-md"
          >
            <option value="">Pasirinkite prekės grupę</option>
            <option value="Robotas">Vejos robotas</option>
            <option value="Kamera">Kamera</option>
            <option value="Registratorius">Registratorius</option>
            <option value="Radaras">Radaro detektorius</option>
          </select>

          <input
            name="product.brand"
            placeholder="Gamintojas"
            value={form["product.brand"] || ""}
            onChange={handleChange}
            required
            className="p-2 border rounded-md"
          />
          <input
            name="product.model"
            placeholder="Modelis"
            value={form["product.model"] || ""}
            onChange={handleChange}
            required
            className="p-2 border rounded-md"
          />
          <input
            name="product.serialNumber"
            placeholder="Serijos numeris"
            value={form["product.serialNumber"] || ""}
            onChange={handleChange}
            required
            className="p-2 border rounded-md"
          />
          <textarea
            name="problemDescription"
            placeholder="Gedimo aprašymas"
            value={form.problemDescription || ""}
            onChange={handleChange}
            required
            className="p-2 border rounded-md"
          ></textarea>
          <input
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={(e) => setFiles([...e.target.files])}
            className="p-2 border rounded-md"
          />
          <input
            name="client.name"
            placeholder="Vardas, pavardė / įmonė"
            value={form["client.name"] || ""}
            onChange={handleChange}
            required
            className="p-2 border rounded-md"
          />
          <input
            name="client.phone"
            placeholder="Telefono numeris"
            value={form["client.phone"] || ""}
            onChange={handleChange}
            required
            className="p-2 border rounded-md"
          />
          <input
            name="client.email"
            placeholder="El. paštas"
            type="email"
            value={form["client.email"] || ""}
            onChange={handleChange}
            required
            className="p-2 border rounded-md"
          />

          <label className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              checked={confirmedLabel}
              onChange={(e) => setConfirmedLabel(e.target.checked)}
              required
            />
            <span>Įsipareigoju nurodyti gautą RMA kodą ant siuntos</span>
          </label>

          <label className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              required
            />
            <span>
              Sutinku su sąlygomis{" "}
              <button
                type="button"
                onClick={() => setShowPopup(true)}
                className="text-blue-600 underline"
              >
                (skaityti)
              </button>
            </span>
          </label>

          {showPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-xl shadow-xl max-w-lg w-full">
                <h3 className="text-xl font-bold mb-4">Sąlygos</h3>
                <p className="mb-4 text-sm">
                  Čia galite įrašyti savo garantinio remonto, siuntimo ir
                  grąžinimo sąlygas.
                </p>
                <button
                  onClick={() => setShowPopup(false)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  Uždaryti
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition"
          >
            {loading ? "Registruojama..." : "Registruoti"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RmaForm;
