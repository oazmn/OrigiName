import LegalPage from "@/components/LegalPage";

export const metadata = {
  title: "Datenschutz · NameGuessr",
};

export default function Datenschutz() {
  return (
    <LegalPage title="Datenschutzerklärung">
      <p className="text-amber-400/80 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3 text-xs mb-4">
        <strong className="text-amber-300">Platzhalter</strong> — Bitte ersetze alle Felder in eckigen Klammern vor dem Go-Live. Lass die Erklärung im Zweifel von einem Rechtsanwalt prüfen.
      </p>

      <h2>1. Verantwortlicher</h2>
      <p>
        Verantwortlicher im Sinne der DSGVO ist:<br />
        [Vor- und Nachname]<br />
        [Straße und Hausnummer]<br />
        [PLZ Ort]<br />
        E-Mail: <a href="mailto:[deine@email.de]">[deine@email.de]</a>
      </p>

      <h2>2. Welche Daten wir verarbeiten</h2>
      <p>
        NameGuessr speichert keine Nutzerkonten und erhebt keine personenbezogenen Daten über Registrierung oder Login. Bei jedem Aufruf der Website überträgt dein Browser technisch bedingt folgende Daten an unseren Server:
      </p>
      <ul>
        <li>IP-Adresse (wird nach Beendigung der Sitzung nicht persistent gespeichert)</li>
        <li>Datum und Uhrzeit des Abrufs</li>
        <li>Browsertyp und -version</li>
        <li>Betriebssystem</li>
        <li>Referrer-URL</li>
      </ul>
      <p>
        Diese Daten werden ausschließlich zum Betrieb der Website benötigt (Art. 6 Abs. 1 lit. f DSGVO – berechtigtes Interesse).
      </p>

      <h2>3. Spielsitzungen</h2>
      <p>
        Während einer Spielrunde werden die Spielzüge (Namensanzeige, Kartenklicks, Punktestand) temporär im Arbeitsspeicher des Servers gehalten. Diese Daten werden <strong>nicht dauerhaft gespeichert</strong> und gehen beim Beenden der Sitzung oder beim Server-Neustart verloren. Es werden keine Cookies zu Tracking-Zwecken gesetzt.
      </p>

      <h2>4. Drittanbieter</h2>

      <h3>Anthropic Claude API</h3>
      <p>
        Zur Generierung von Spielnamen nutzen wir die Claude API von Anthropic, PBC (548 Market St, PMB 90375, San Francisco, CA 94104, USA). Dabei werden Anfragen an die Anthropic-Server übertragen. Anthropic verarbeitet diese Daten gemäß seiner eigenen Datenschutzrichtlinie. Für Spielanfragen werden keine personenbezogenen Daten an Anthropic übermittelt – die Anfragen enthalten nur spielinterne Parameter (Kulturangabe). Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.
      </p>
      <p>
        <a href="https://www.anthropic.com/privacy" target="_blank" rel="noopener noreferrer">Datenschutzerklärung von Anthropic</a>
      </p>

      <h3>CARTO Kartendienst</h3>
      <p>
        Die interaktive Weltkarte wird über Kartenkacheln von CARTO (CartoDB, Inc., 201 Moore St, Brooklyn, NY 11206, USA) bereitgestellt. Beim Laden der Karte wird deine IP-Adresse an CARTO-Server übertragen. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.
      </p>
      <p>
        <a href="https://carto.com/privacy" target="_blank" rel="noopener noreferrer">Datenschutzerklärung von CARTO</a>
      </p>

      <h3>Hosting</h3>
      <p>
        Diese Website wird gehostet bei [Hosting-Anbieter, z. B. Vercel Inc., 340 Pine Street Suite 701, San Francisco, CA 94104, USA]. Der Hoster verarbeitet Verbindungsdaten gemäß seiner Datenschutzrichtlinie. Ein Auftragsverarbeitungsvertrag (AVV) gemäß Art. 28 DSGVO ist abzuschließen bzw. liegt vor.
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
        Zur Ausübung deiner Rechte wende dich an: <a href="mailto:[deine@email.de]">[deine@email.de]</a>
      </p>

      <h2>6. Cookies</h2>
      <p>
        Diese Website setzt keine Tracking- oder Analyse-Cookies. Technisch notwendige Session-Daten werden ausschließlich serverseitig im Arbeitsspeicher gehalten und nicht als Cookie im Browser gespeichert.
      </p>

      <h2>7. Aktualität und Änderungen</h2>
      <p>
        Diese Datenschutzerklärung ist aktuell gültig und hat den Stand <strong>[Datum eintragen]</strong>. Wir behalten uns vor, sie bei Änderungen der Website oder bei geänderten rechtlichen Anforderungen anzupassen.
      </p>
    </LegalPage>
  );
}
