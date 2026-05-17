import LegalPage from "@/components/LegalPage";

export const metadata = {
  title: "Impressum · NameGuessr",
};

export default function Impressum() {
  return (
    <LegalPage title="Impressum">
      <p className="text-amber-400/80 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3 text-xs mb-4">
        <strong className="text-amber-300">Platzhalter</strong> — Bitte ersetze alle Felder in eckigen Klammern mit deinen echten Angaben, bevor die Seite live geht.
      </p>

      <h2>Angaben gemäß § 5 TMG</h2>
      <p>
        [Vor- und Nachname]<br />
        [Straße und Hausnummer]<br />
        [PLZ Ort]<br />
        Deutschland
      </p>

      <h2>Kontakt</h2>
      <p>
        E-Mail: <a href="mailto:[deine@email.de]">[deine@email.de]</a>
      </p>
      <p>
        <em className="text-gray-600 text-xs">
          Eine Telefonnummer ist nach § 5 TMG nicht zwingend erforderlich, erleichtert jedoch die Erreichbarkeit.
        </em>
      </p>

      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>
        [Vor- und Nachname]<br />
        [Straße und Hausnummer]<br />
        [PLZ Ort]
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
    </LegalPage>
  );
}
