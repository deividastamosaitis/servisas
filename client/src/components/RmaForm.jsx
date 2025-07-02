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

      const formData = new FormData();
      formData.append("data", JSON.stringify(payload));
      files.forEach((file) => formData.append("files", file));

      const res = await axios.post("/api/rma/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

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
            className="w-full p-2 border rounded-md"
          >
            <option value="">Pasirinkite prekės grupę</option>
            <option value="Robotas">Vejos robotas</option>
            <option value="Kamera">Kamera</option>
            <option value="Registratorius">Registratorius</option>
            <option value="Radaras">Radaro detektorius</option>
            <option value="Kita">Kita</option>
          </select>

          <input
            name="product.brand"
            placeholder="Gamintojas"
            value={form["product.brand"] || ""}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
          <input
            name="product.model"
            placeholder="Modelis"
            value={form["product.model"] || ""}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
          <input
            name="product.serialNumber"
            placeholder="Serijos numeris"
            value={form["product.serialNumber"] || ""}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
          <textarea
            name="problemDescription"
            placeholder="Gedimo aprašymas"
            value={form.problemDescription || ""}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          ></textarea>

          <input
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={(e) => setFiles([...e.target.files])}
            className="block w-full p-2 border rounded-md"
          />

          <input
            name="client.name"
            placeholder="Vardas, pavardė / įmonė"
            value={form["client.name"] || ""}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
          <input
            name="client.phone"
            placeholder="Telefono numeris"
            value={form["client.phone"] || ""}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
          <input
            name="client.email"
            placeholder="El. paštas"
            type="email"
            value={form["client.email"] || ""}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />

          <label className="flex items-start gap-2 text-sm break-words">
            <input
              type="checkbox"
              checked={confirmedLabel}
              onChange={(e) => setConfirmedLabel(e.target.checked)}
              required
            />
            <span className="block">
              Įsipareigoju nurodyti gautą RMA kodą ant siuntos
            </span>
          </label>

          <label className="flex items-start gap-2 text-sm break-words">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              required
            />
            <span className="block">
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
              <div className="bg-white p-6 rounded-xl shadow-xl max-w-3xl w-full max-h-[80vh] overflow-y-auto">
                <h3 className="text-xl font-bold mb-4">
                  Remonto registracija ir atlikimo taisyklės
                </h3>
                <div className="text-sm space-y-3 leading-relaxed">
                  <p>
                    <strong>1.</strong> Remontuojamos tik UAB "Todesa"
                    GPSmeistras.lt fizinėje ir elektroninėje parduotuvėje
                    įsigytos prekės. Kitur įsigytų prekių remontui nepriimame.
                  </p>
                  <p>
                    <strong>2.</strong> Remonto registracijos pildymas.
                    Užpildykite reikiamus registracijai laukus. Klientas yra
                    pilnai atsakingas už pateikiamų duomenų teisingumą. UAB
                    Todesa neprisiima atsakomybės dėl įvykusių sutrikimų įtakotų
                    klaidingai pateiktų duomenų.
                  </p>
                  <p>
                    <strong>2.1.</strong> Sąskaitos arba užsakymo numeris.
                    Prašome nurodyti sąskaitos, pagal kurią pateikiate
                    remontuojamą prekę, numerį. Taip pat galite nurodyti
                    užsakymo numerį, jei prekė įsigyta el. parduotuvėje. Šių
                    duomenų galite ir nepateikti, tokiu atveju į laukelį prašome
                    įrašyti „nėra“.
                  </p>
                  <p>
                    <strong>2.2.</strong> Laukeliuose "Gamintojas" ir "Modelis"
                    svarbu surašyti kuo tikslesnius prekės duomenis.
                  </p>
                  <p>
                    <strong>2.3.</strong> Gedimo aprašymas. Kuo tiksliau
                    aprašykite prekės sutrikimus ir/arba sąlygas, kada gedimas
                    pasireiškia. Detalesnė informacija padeda greičiau
                    identifikuoti gedimą.
                  </p>
                  <p>
                    <strong>2.4.</strong> Rekomenduojame pridėti ir papildomų
                    vaizdo įrašų ar nuotraukų su gedimo informacija, problemomis
                    su kuriomis susiduriate.
                  </p>
                  <p>
                    <strong>2.5.</strong> Užpildykite savo kontaktinius
                    duomenis, galite įrašyti ar pildote kaip fizinis asmuo ar
                    kaip įmonė.
                  </p>
                  <p>
                    <strong>2.6.</strong> Užpildžius duomenis, gausite remonto
                    registracijos numerį (prasideda GPS_RMA), taip pat matysite
                    savo remonto registracijos būklę, atskirą kiekvienai prekei.
                  </p>
                  <p>
                    <strong>3.</strong> Remontuojama prekė (prekės) išsiunčiama
                    arba pristatoma į UAB Todesa (GPSmeistras) centrinę būstinę,
                    esančią adresu Jonavos g. 204A, Kaunas, 44132, Lietuva.
                    Pirkėjas rūpinasi remontuojamų prekių pristatymu į UAB
                    Todesa (GPSmeistras) pats, savo lėšomis, pasirinktu būdu.
                    Prekės gali būti atnešamos pirkėjo į UAB
                    Todesa(GPSmeistras), pristatomos per pirkėjo pasirinktą
                    kurjerių tarnybą arba paštą. Prekės turi būti pristatytos į
                    būstinę{" "}
                    <strong>
                      (pristatymas į paštomatus ar pašto padalinius netinkamas)
                    </strong>
                    .
                  </p>
                  <p>
                    <strong>3.1.</strong> Prekės turi būti saugiai supakuotos.
                    UAB Todesa neatsako už pažeidimus, nutikusius transportavimo
                    metu dėl nesaugaus ir netinkamo prekių supakavimo.
                  </p>
                  <p>
                    <strong>
                      3.2. SVARBU! Privaloma ant siunčiamos pakuotės užrašyti ar
                      kitaip pritvirtinti gautą remonto registracijos numerį.
                    </strong>
                  </p>
                  <p>
                    <strong>3.3.</strong> Prekės turi būti pristatytos į UAB
                    Todesa per 14 d. nuo remonto registracijos atlikimo. Kitu
                    atveju UAB Todesa pasilieka teisę remonto registraciją
                    pašalinti
                  </p>
                  <p>
                    <strong>4.</strong> Remonto atlikimas:
                  </p>
                  <p>
                    <strong>4.1.</strong> Gavę remontuojamas prekes, Jūsų
                    registruotos remontui prekės būklę pakeičiame į „Prekė gauta
                    į servisą“, išsiunčiame apie remonto būsenos pasikeitimą
                    informuojantį el. laišką.
                  </p>
                  <p>
                    <strong>4.2.</strong> Įvertiname prekės gedimą. Jei remontas
                    negarantinis, susisiekiame ir informuojame apie remonto
                    darbų kainą ir terminus.
                  </p>
                  <p>
                    <strong>4.3.</strong> Pirkėjas turi teisę atsisakyti remonto
                    darbų, netenkinant kainai ar terminui, informuodamas UAB
                    Todesa apie šį sprendimą, prieš pradedant remonto darbus.
                  </p>
                  <p>
                    <strong>4.4.</strong> Priklausomai nuo gedimo pobūdžio,
                    remontą atliekame patys arba siunčiame prekę remontuoti
                    gamintojui (šiuo atveju informuojame el. laišku).
                  </p>
                  <p>
                    <strong>4.5.</strong> Atlikę remontą arba gavę suremontuotą
                    prekę iš gamintojo, pateikiame remonto darbų sąskaitą (jei
                    atliktas negarantinis remontas).
                  </p>
                  <p>
                    <strong>4.6.</strong> Klientas apmoka remonto darbų sąskaitą
                    pagal pateiktus apmokėjimo terminus.
                  </p>
                  <p>
                    <strong>4.7.</strong> Gavus apmokėjimą už remonto darbus
                    (netaikoma klientams, apmokantiems sąskaitas su atidėjimu
                    pagal sutartį), sutaisytą prekę išsiunčiame pirkėjui pagal
                    pateiktus kontaktinius duomenis, informuojame el. laišku.
                  </p>
                  <p>
                    <strong>4.8.</strong> Suremontuotą prekę UAB Todesa
                    išsiunčia per kurjerių tarnybą savo lėšomis.
                  </p>
                  <p>
                    <strong>4.9.</strong> Siunčiant suremontuotas prekes atgal
                    klientui už Lietuvos ribų, UAB Todesa pasilieka teisę
                    papildomai išrašyti sąskaitą už transportavimo kaštus.
                  </p>
                  <p>
                    <strong>5.</strong> UAB Eproma įsipareigoja:
                  </p>
                  <p>
                    <strong>5.1.</strong> Atlikti remontą per trumpiausią
                    įmanomą laiką.
                  </p>
                  <p>
                    <strong>5.2.</strong> Informuoti klientą apie remonto būsenų
                    pasikeitimus.
                  </p>
                  <p>
                    <strong>5.3.</strong> Informuoti klientą apie remonto darbų
                    kainą ir numatomus terminus.
                  </p>
                  <p>
                    <strong>5.4.</strong> Pirkėjui atsisakius remonto paslaugų,
                    išsiųsti prekę atgal pirkėjui, jei pirkėjas to pageidauja
                    (siunčiant prekes už Lietuvos ribų, UAB Todesa pasilieka
                    teisę papildomai išrašyti sąskaitą už transportavimo
                    kaštus).
                  </p>
                </div>
                <div className="mt-6 text-right">
                  <button
                    onClick={() => setShowPopup(false)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Uždaryti
                  </button>
                </div>
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
