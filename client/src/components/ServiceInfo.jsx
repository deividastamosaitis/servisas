import React from "react";

const ServiceInfo = () => {
  return (
    <div className="bg-white mt-8 p-6 sm:p-10 rounded-xl shadow-xl space-y-6 leading-relaxed text-sm text-gray-800">
      <h2 className="text-2xl font-bold text-[#0056A0]">
        Informacija apie garantinį servisą
      </h2>

      {/* Sekcija 1 */}
      <div>
        <h3 className="text-lg font-semibold mb-1">
          Nuotolinis įrenginio siuntimas
        </h3>
        <p>
          Jei jums nepatogu ar nėra galimybių atvykti dėl remontų į mūsų
          parduotuvę Kaune, Jonavos g. 204a, galime pasirūpinti Jūsų įrenginiu
          jį pristatant mums tiesiogiai į adresą. Po serviso laikotarpio Jūsų
          prekė galime grąžinti į pasirinktą adresą ar paštomatą. Tad nereiks
          Jums vargintis pas mus važiuoti – viską už Jus atliks kurjeriai.
          Norint pasinaudoti šia paslauga, prašome užpildyti serviso formą,
          kurią rasite pagrindiniame puslapyje.
        </p>
      </div>

      {/* Sekcija 2 */}
      <div>
        <h3 className="text-lg font-semibold mb-1">
          {" "}
          Alkotesterių remontas ir kalibravimas
        </h3>
        <p>
          Atliekame <strong>AlcoDetector</strong> alkotesterių remontus,
          jutiklių kalibravimus ir keitimus. Suteikiame garantiją bei išrašome
          metrologines pažymas.
        </p>
        <p>
          Teikiamos paslaugos: metrologinė alkotesterių pažyma, alkotesterių
          kalibravimas, garantinis ir pogarantinis remontas.
        </p>
      </div>

      {/* Sekcija 3 */}
      <div>
        <h3 className="text-lg font-semibold mb-1">
          {" "}
          Garantinio remonto trukmė
        </h3>
        <p>
          Daugelis mūsų parduodamų prekių turi{" "}
          <strong>2 metų garantijos</strong> terminą. Prekės eksploatavimo metu
          atsiradę gedimai šalinami per:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>15–25 darbo dienas nuo perdavimo į techninį centrą;</li>
          <li>
            arba iki 30 darbo dienų, jei reikalingos detalės pristatomos iš
            užsienio ar remontas atliekamas už Lietuvos ribų.
          </li>
        </ul>
        <p>
          Visais atvejais garantinį aptarnavimą siekiame atlikti per kuo
          trumpesnį laiką.
        </p>
      </div>
    </div>
  );
};

export default ServiceInfo;
