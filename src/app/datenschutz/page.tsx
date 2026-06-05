"use client";

import { useState } from "react";
import LegalPage from "@/components/LegalPage";

const NAME = "Olisa Zimmermann";
const ADDRESS = "Bleichstraße 6, 60313 Frankfurt am Main, Deutschland";
const EMAIL = "originame@protonmail.com";
const DATE_DE = "5. Juni 2026";
const DATE_EN = "5 June 2026";

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
      <h2>1. Verantwortlicher</h2>
      <p>
        Verantwortlicher im Sinne der DSGVO ist:<br />
        {NAME}<br />
        {ADDRESS}<br />
        E-Mail: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </p>

      <h2>2. Welche Daten wir verarbeiten</h2>
      <p>
        OrigiName speichert keine Nutzerkonten und erhebt keine personenbezogenen Daten
        über Registrierung oder Login. Bei jedem Seitenaufruf überträgt dein Browser
        technisch bedingt folgende Daten an den Hosting-Server (GitHub Pages):
      </p>
      <ul>
        <li>IP-Adresse</li>
        <li>Datum und Uhrzeit des Abrufs</li>
        <li>Browsertyp und -version</li>
        <li>Betriebssystem</li>
        <li>Referrer-URL</li>
      </ul>
      <p>
        Diese Daten werden von GitHub gemäß deren Datenschutzrichtlinie verarbeitet.
        Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO – berechtigtes Interesse.
      </p>

      <h2>3. Spielsitzungen</h2>
      <p>
        Das Spiel läuft vollständig in deinem Browser. Spielzüge (Namensanzeige,
        Kartenklicks, Punktestand) werden ausschließlich lokal im Arbeitsspeicher deines
        Geräts gehalten und <strong>niemals an einen Server übertragen</strong>. Mit dem
        Schließen des Browser-Tabs gehen alle Spieldaten verloren. Die Namensdatenbank
        ist fest in die Website eingebettet und wird beim Laden der Seite einmalig
        übertragen.
      </p>

      <h2>4. Drittanbieter</h2>

      <h3>CARTO Kartendienst</h3>
      <p>
        Die interaktive Weltkarte wird über Kartenkacheln von CARTO (CartoDB, Inc.,
        201 Moore St, Brooklyn, NY 11206, USA) bereitgestellt. Beim Laden der Karte
        wird deine IP-Adresse an CARTO-Server übertragen. Rechtsgrundlage:
        Art. 6 Abs. 1 lit. f DSGVO.
      </p>
      <p>
        <a href="https://carto.com/privacy" target="_blank" rel="noopener noreferrer">
          Datenschutzerklärung von CARTO
        </a>
      </p>

      <h3>Hosting</h3>
      <p>
        Diese Website wird gehostet bei GitHub Pages (GitHub, Inc., 88 Colin P Kelly Jr.
        Street, San Francisco, CA 94107, USA). Der Hoster verarbeitet Verbindungsdaten
        gemäß seiner Datenschutzrichtlinie.
      </p>
      <p>
        <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer">
          Datenschutzerklärung von GitHub
        </a>
      </p>

      <h2>5. Deine Rechte</h2>
      <p>Du hast gemäß DSGVO folgende Rechte:</p>
      <ul>
        <li><strong>Auskunft</strong> (Art. 15 DSGVO) über deine bei uns gespeicherten Daten</li>
        <li><strong>Berichtigung</strong> (Art. 16 DSGVO) unrichtiger Daten</li>
        <li><strong>Löschung</strong> (Art. 17 DSGVO) deiner Daten</li>
        <li><strong>Einschränkung der Verarbeitung</strong> (Art. 18 DSGVO)</li>
        <li><strong>Datenübertragbarkeit</strong> (Art. 20 DSGVO)</li>
        <li><strong>Widerspruch</strong> (Art. 21 DSGVO) gegen die Verarbeitung</li>
        <li><strong>Beschwerde</strong> bei einer Aufsichtsbehörde (Art. 77 DSGVO)</li>
      </ul>
      <p>
        Zur Ausübung deiner Rechte wende dich an:{" "}
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </p>

      <h2>6. Cookies</h2>
      <p>
        Diese Website setzt keine Cookies – weder zu Tracking- noch zu technischen Zwecken.
        Da das Spiel vollständig clientseitig läuft, werden keinerlei spielbezogene Daten
        serverseitig gespeichert.
      </p>

      <h2>7. Aktualität und Änderungen</h2>
      <p>
        Diese Datenschutzerklärung ist aktuell gültig und hat den Stand{" "}
        <strong>{DATE_DE}</strong>. Wir behalten uns vor, sie bei Änderungen der Website
        oder bei geänderten rechtlichen Anforderungen anzupassen.
      </p>
    </>
  );
}

function ContentEN() {
  return (
    <>
      <h2>1. Controller</h2>
      <p>
        The controller responsible for data processing under the GDPR is:<br />
        {NAME}<br />
        {ADDRESS}<br />
        Email: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </p>

      <h2>2. Data we process</h2>
      <p>
        OrigiName does not store user accounts and does not collect personal data through
        registration or login. Each time you visit the website, your browser automatically
        transmits the following data to the hosting server (GitHub Pages):
      </p>
      <ul>
        <li>IP address</li>
        <li>Date and time of the request</li>
        <li>Browser type and version</li>
        <li>Operating system</li>
        <li>Referrer URL</li>
      </ul>
      <p>
        This data is processed by GitHub in accordance with their privacy policy.
        Legal basis: Art. 6(1)(f) GDPR – legitimate interest.
      </p>

      <h2>3. Game sessions</h2>
      <p>
        The game runs entirely in your browser. Game moves (name display, map clicks,
        score) are held exclusively in your device's local memory and are{" "}
        <strong>never transmitted to any server</strong>. All game data is lost when you
        close the browser tab. The name database is embedded in the website and
        transferred once when the page loads.
      </p>

      <h2>4. Third-party services</h2>

      <h3>CARTO Map Service</h3>
      <p>
        The interactive world map is provided via map tiles from CARTO (CartoDB, Inc.,
        201 Moore St, Brooklyn, NY 11206, USA). When the map loads, your IP address is
        transmitted to CARTO's servers. Legal basis: Art. 6(1)(f) GDPR.
      </p>
      <p>
        <a href="https://carto.com/privacy" target="_blank" rel="noopener noreferrer">
          CARTO Privacy Policy
        </a>
      </p>

      <h3>Hosting</h3>
      <p>
        This website is hosted on GitHub Pages (GitHub, Inc., 88 Colin P Kelly Jr. Street,
        San Francisco, CA 94107, USA). The host processes connection data in accordance
        with its own privacy policy.
      </p>
      <p>
        <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer">
          GitHub Privacy Policy
        </a>
      </p>

      <h2>5. Your rights</h2>
      <p>Under the GDPR you have the following rights:</p>
      <ul>
        <li><strong>Access</strong> (Art. 15 GDPR) to the data we hold about you</li>
        <li><strong>Rectification</strong> (Art. 16 GDPR) of inaccurate data</li>
        <li><strong>Erasure</strong> (Art. 17 GDPR) of your data</li>
        <li><strong>Restriction of processing</strong> (Art. 18 GDPR)</li>
        <li><strong>Data portability</strong> (Art. 20 GDPR)</li>
        <li><strong>Objection</strong> (Art. 21 GDPR) to processing</li>
        <li><strong>Complaint</strong> to a supervisory authority (Art. 77 GDPR)</li>
      </ul>
      <p>
        To exercise your rights, contact us at:{" "}
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </p>

      <h2>6. Cookies</h2>
      <p>
        This website sets no cookies — neither for tracking nor for technical purposes.
        Since the game runs entirely client-side, no game-related data is stored
        server-side.
      </p>

      <h2>7. Updates</h2>
      <p>
        This privacy policy is currently valid as of <strong>{DATE_EN}</strong>. We
        reserve the right to update it when the website changes or legal requirements
        evolve.
      </p>
    </>
  );
}

export default function Datenschutz() {
  const [lang, setLang] = useState<"de" | "en">("de");

  return (
    <LegalPage title={lang === "de" ? "Datenschutzerklärung" : "Privacy Policy"}>
      <LanguageToggle lang={lang} onChange={setLang} />
      {lang === "de" ? <ContentDE /> : <ContentEN />}
    </LegalPage>
  );
}
