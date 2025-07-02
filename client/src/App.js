import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RmaForm from "./components/RmaForm";
import RmaStatusCheck from "./components/RmaStatusCheck";
import RmaStatusPage from "./pages/RmaStatusPage";
import ServiceInfo from "./components/ServiceInfo";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#f3f4f6] text-gray-900 flex flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
        <Routes>
          <Route
            path="/"
            element={
              <div className="max-w-3xl w-full">
                {/* Pradinis pasirinkimas */}
                <MainOptions />
              </div>
            }
          />
          <Route path="/status/:rma" element={<RmaStatusPage />} />
        </Routes>

        <footer className="mt-10 text-sm text-gray-500 text-center">
          &copy; {new Date().getFullYear()} GPSmeistras. Visos teisės saugomos.
        </footer>
      </div>
    </Router>
  );
}

function MainOptions() {
  const [view, setView] = React.useState(null);

  return (
    <>
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#0056A0]">
          GPSmeistras Servisas
        </h1>
        <p className="text-sm text-gray-600 mt-2">Pasirinkite norimą veiksmą</p>
      </header>

      {!view && (
        <>
          <div className="bg-white shadow-xl rounded-xl p-6 sm:p-10 space-y-6">
            <h2 className="text-xl font-semibold text-center">
              Pasirinkite veiksmą
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <button
                onClick={() => setView("register")}
                className="bg-[#0056A0] text-white font-semibold py-3 px-4 rounded-md hover:bg-[#004080] transition"
              >
                ➡ Registruoti gedimą
              </button>
              <button
                onClick={() => setView("status")}
                className="bg-gray-800 text-white font-semibold py-3 px-4 rounded-md hover:bg-gray-700 transition"
              >
                🔍 Patikrinti RMA statusą
              </button>
            </div>
          </div>

          {/* Informacijos komponentas apačioje */}
          <ServiceInfo />
        </>
      )}

      {view && (
        <div className="mt-6 space-y-4">
          <div className="text-left">
            <button
              onClick={() => setView(null)}
              className="text-sm text-[#0056A0] underline hover:text-[#003b6f] transition"
            >
              ⬅ Grįžti atgal
            </button>
          </div>

          {view === "register" && <RmaForm />}
          {view === "status" && <RmaStatusCheck />}
        </div>
      )}
    </>
  );
}

export default App;
