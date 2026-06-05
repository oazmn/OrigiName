"use client";

import { useState } from "react";
import LegalPage from "@/components/LegalPage";

const NAME = "Olisa Zimmermann";
const ADDRESS = "Bleichstraße 6, 60313 Frankfurt am Main, Deutschland";
const EMAIL = "originame@protonmail.com";
const DATE_DE = "30. Mai 2026";
const DATE_EN = "30 May 2026";

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
        Originame speichert keine Nutzerkonten und erhebt keine personenbezogenen Daten
        über Registrierung oder Login. Bei jedem Aufruf der Website überträgt dein Browser
        technisch bedingt folgende Daten an unseren Server:
      </p>
      <ul>
        <li>IP-Adresse (wird nach Beendigung der Sitzung nicht persistent gespeichert)</li>
        <li>Datum und Uhrzeit des Abrufs</li>
        <li>Browsertyp und -version</li>
        <li>Betriebssystem</li>
        <li>Referrer-URL</li>
      </ul>
      <p>
        Diese Daten werden ausschließlich zum Betrieb der Website benötigt
        (Art. 6 Abs. 1 lit. f DSGVO – berechtigtes Interesse).
      </p>

      <h2>3. Spielsitzungen</h2>
      <p>
        Während einer Spielrunde werden die Spielzüge (Namensanzeige, Kartenklicks,
        Punktestand) temporär im Arbeitsspeicher des Servers gehalten. Diese Daten werden{" "}
        <strong>nicht dauerhaft gespeichert</strong> und gehen beim Beenden der Sitzung
        oder beim Server-Neustart verloren. Es werden keine Cookies zu Tracking-Zwecken
        gesetzt.
      </p>

      <h2>4. Drittanbieter</h2>

      <h3>Anthropic Claude API</h3>
      <p>
        Zur Generierung von Spielnamen nutzen wir die Claude API von Anthropic, PBC
        (548 Market St, PMB 90375, San Francisco, CA 94104, USA). Dabei werden Anfragen
        an die Anthropic-Server übertragen. Für Spielanfragen werden keine
        personenbezogenen Daten an Anthropic übermittelt – die Anfragen enthalten nur
        spielinterne Parameter (Kulturangabe). Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.
      </p>
      <p>
        <a href="https://www.anthropic.com/privacy" target="_blank" rel="noopener noreferrer">
          Datenschutzerklärung von Anthropic
        </a>
      </p>

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
        Diese Website setzt keine Tracking- oder Analyse-Cookies. Technisch notwendige
        Session-Daten werden ausschließlich serverseitig im Arbeitsspeicher gehalten und
        nicht als Cookie im Browser gespeichert.
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
        Originame does not store user accounts and does not collect personal data through
        registration or login. Each time you visit the website, your browser automatically
        transmits the following data to our server:
      </p>
      <ul>
        <li>IP address (not stored persistently after the session ends)</li>
        <li>Date and time of the request</li>
        <li>Browser type and version</li>
        <li>Operating system</li>
        <li>Referrer URL</li>
      </ul>
      <p>
        This data is used solely to operate the website (Art. 6(1)(f) GDPR – legitimate
        interest).
      </p>

      <h2>3. Game sessions</h2>
      <p>
        During a game round, your moves (name display, map clicks, score) are held
        temporarily in server memory. This data is{" "}
        <strong>not stored persistently</strong> and is lost when the session ends or
        the server restarts. No tracking cookies are set.
      </p>

      <h2>4. Third-party services</h2>

      <h3>Anthropic Claude API</h3>
      <p>
        To generate game names we use the Claude API by Anthropic, PBC (548 Market St,
        PMB 90375, San Francisco, CA 94104, USA). Requests are transmitted to Anthropic's
        servers. No personal data is included in game requests — they contain only
        in-game parameters (culture name). Legal basis: Art. 6(1)(f) GDPR.
      </p>
      <p>
        <a href="https://www.anthropic.com/privacy" target="_blank" rel="noopener noreferrer">
          Anthropic Privacy Policy
        </a>
      </p>

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
        This website sets no tracking or analytics cookies. Technically necessary session
        data is held exclusively in server memory and is not stored as a cookie in your
        browser.
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
