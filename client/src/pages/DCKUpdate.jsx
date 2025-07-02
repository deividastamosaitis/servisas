import React from "react";

const DCKUpdate = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center">
      <div className="bg-white shadow-xl rounded-xl p-6 sm:p-10 max-w-3xl w-full">
        <h1 className="text-2xl font-bold text-center text-[#0056A0] mb-6">
          DCK Įrenginio Atnaujinimas
        </h1>

        <p className="mb-4 text-gray-700 text-base">
          Šiame puslapyje galite atsisiųsti DCK įrenginio atnaujinimo failą.
          Toliau pateikiamos aiškios instrukcijos, kaip šį failą įrašyti į USB
          atmintinę ir atnaujinti įrenginį.
        </p>

        <div className="text-center mb-8">
          <a
            href="/files/KDRM210.RLM.v1.0.13_r0.20250628.pkg"
            download
            className="inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-blue-700 transition"
          >
            Atsisiųsti naujausią versiją!
          </a>
        </div>

        {/* Android */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            📱 Instrukcija Android naudotojams (USB-C jungtis)
          </h2>
          <ol className="list-decimal pl-5 text-gray-700 space-y-2 text-sm">
            <li>Prijunkite USB atmintinę su Type-C jungtimi prie telefono.</li>
            <li>
              Telefone turėtų pasirodyti langas – pasirinkite{" "}
              <b>„Peržiūrėti failus“</b>.
            </li>
            <li>
              Naršyklėje (Chrome ar kita) paspauskite mygtuką „Atsisiųsti failą“
              (žr. viršuje).
            </li>
            <li>
              Atsisiuntus failą, atidarykite <b>„Failų“</b> programėlę telefone.
            </li>
            <li>
              Suraskite{" "}
              <b>atsisiųstą failą „KDRM210.RLM.v1.0.13_r0.20250628.pkg“</b> ir
              paspauskite jį palaikydami, tada pasirinkite <b>„Kopijuoti“</b>{" "}
              arba <b>„Perkelti“</b>.
            </li>
            <li>
              Nukeliaukite į prijungtą USB atmintinę ir įklijuokite ten failą.
            </li>
            <li>
              Atjunkite USB atmintinę saugiai ir prijunkite ją prie DCK
              įrenginio.
            </li>
          </ol>
        </section>

        {/* iPhone */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Instrukcija iPhone naudotojams (USB-C jungtis)
          </h2>
          <ol className="list-decimal pl-5 text-gray-700 space-y-2 text-sm">
            <li>Prijunkite USB atmintinę per USB-C prie iPhone.</li>
            <li>
              Atidarykite programėlę <b>„Failai“</b> (Files).
            </li>
            <li>
              Naršyklėje paspauskite mygtuką „Atsisiųsti failą“. Failas atsisiųs
              į<b>„Atsisiuntimų“</b> (Downloads) aplanką.
            </li>
            <li>
              „Failų“ programėlėje suraskite failą{" "}
              <b>„KDRM210.RLM.v1.0.13_r0.20250628.pkg“</b>.
            </li>
            <li>
              Paspauskite ir palaikykite ant failo, tada pasirinkite{" "}
              <b>„Perkelti“</b>.
            </li>
            <li>
              Pasirinkite USB laikmeną kaip paskirties vietą ir įklijuokite
              failą.
            </li>
            <li>
              Atjunkite USB atmintinę ir prijunkite ją prie DCK įrenginio.
            </li>
          </ol>
        </section>

        {/* Pastabos */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Papildomos pastabos
          </h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-2 text-sm">
            <li>
              USB atmintinė turi būti suformatuota <b>FAT32</b> arba{" "}
              <b>exFAT</b> formatu.
            </li>
            <li>
              Failo pervadinti nereikia – palikite pavadinimą
              „KDRM210.RLM.v1.0.13_r0.20250628.pkg“.
            </li>
            <li>
              DCK įrenginys automatiškai aptinka failą po įjungimo su įdėta USB
              laikmena.
            </li>
            <li>
              Jei nepavyksta, įsitikinkite, kad įrenginys palaiko tą USB tipą ir
              formatą.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default DCKUpdate;
