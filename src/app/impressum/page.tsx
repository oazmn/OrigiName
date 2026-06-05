"use client";

import { useState } from "react";
import LegalPage from "@/components/LegalPage";

const NAME = "Olisa Zimmermann";
const STREET = "Bleichstraße 6";
const CITY = "60313 Frankfurt am Main";
const COUNTRY_DE = "Deutschland";
const COUNTRY_EN = "Germany";
const EMAIL = "originame@protonmail.com";

function LanguageToggle({
  lang,
  onChange,
}: {
  lang: "de" | "en";
  onChange: (l: "de" | "en") => void;
}) {
  return (
    <div className="flex items-center gap-1 mb-6 p-1 bg-white/5 border border-white/10 rounded-xl w-fit">
      {(["de", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => onChange(l)}
          className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
            lang === l
              ? "bg-violet-600 text-white shadow"
              : "text-gray-500 hover:text-gray-300"
          }`}
        >
          {l === "de" ? "Deutsch" : "English"}
        </button>
      ))}
    </div>
  );
}

function ContentDE() {
  return (
    <>
      <h2>Angaben gemäß § 5 TMG</h2>
      <p>
        {NAME}<br />
        {STREET}<br />
        {CITY}<br />
        {COUNTRY_DE}
      </p>

      <h2>Kontakt</h2>
      <p>
        E-Mail: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </p>

      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>
        {NAME}<br />
        {STREET}<br />
        {CITY}
      </p>

      <h2>Haftung für Inhalte</h2>
      <p>
        Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
      </p>
      <p>
        Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
      </p>

      <h2>Haftung für Links</h2>
      <p>
        Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
      </p>

      <h2>Urheberrecht</h2>
      <p>
        Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
      </p>
    </>
  );
}

function ContentEN() {
  return (
    <>
      <h2>Information pursuant to § 5 TMG</h2>
      <p>
        {NAME}<br />
        {STREET}<br />
        {CITY}<br />
        {COUNTRY_EN}
      </p>

      <h2>Contact</h2>
      <p>
        Email: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </p>

      <h2>Responsible for content pursuant to § 18 (2) MStV</h2>
      <p>
        {NAME}<br />
        {STREET}<br />
        {CITY}
      </p>

      <h2>Liability for Content</h2>
      <p>
        As a service provider we are responsible for our own content on these pages in accordance with general law pursuant to § 7 (1) TMG. However, pursuant to §§ 8 to 10 TMG, we are not obligated to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity.
      </p>
      <p>
        Obligations to remove or block the use of information under general law remain unaffected. Liability in this regard is only possible from the point in time at which a concrete legal violation becomes known. Upon becoming aware of such violations, we will remove this content immediately.
      </p>

      <h2>Liability for Links</h2>
      <p>
        Our website contains links to external third-party websites over whose content we have no influence. We therefore cannot accept any liability for this external content. The respective provider or operator of the linked pages is always responsible for their content. Upon becoming aware of legal violations, we will remove such links immediately.
      </p>

      <h2>Copyright</h2>
      <p>
        The content and works created by the site operator on these pages are subject to German copyright law. Reproduction, editing, distribution, and any kind of use beyond the limits of copyright law require the written consent of the respective author or creator. Downloads and copies of this page are only permitted for private, non-commercial use.
      </p>
    </>
  );
}

export default function Impressum() {
  const [lang, setLang] = useState<"de" | "en">("de");

  return (
    <LegalPage title={lang === "de" ? "Impressum" : "Legal Notice"}>
      <LanguageToggle lang={lang} onChange={setLang} />
      {lang === "de" ? <ContentDE /> : <ContentEN />}
    </LegalPage>
  );
}
