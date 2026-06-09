import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  robots: { index: false, follow: false },
};

export default function DatenschutzPage() {
  return (
    <LegalPage lang="de" page="datenschutz">
      <h1>Datenschutzerklärung</h1>

      <h2>1. Verantwortlicher</h2>
      <p>
        Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) und anderer nationaler Datenschutzgesetze sowie sonstiger datenschutzrechtlicher Bestimmungen ist:
      </p>
      <p>
        Christian Wenterodt<br />
        Kasoria – Webdesign<br />
        Birkenweg 9<br />
        21629 Neu Wulmstorf<br />
        Telefon: 0151 6815 2133<br />
        E-Mail: <a href="mailto:kontakt@kasoria.com">kontakt@kasoria.com</a>
      </p>

      <h2>2. Allgemeines zur Datenverarbeitung</h2>
      <p>
        Wir verarbeiten personenbezogene Daten unserer Nutzer grundsätzlich nur, soweit dies zur Bereitstellung einer funktionsfähigen Website sowie unserer Inhalte und Leistungen erforderlich ist. Die Verarbeitung personenbezogener Daten erfolgt regelmäßig nur nach Einwilligung des Nutzers. Eine Ausnahme gilt in solchen Fällen, in denen eine vorherige Einholung einer Einwilligung aus tatsächlichen Gründen nicht möglich ist und die Verarbeitung der Daten durch gesetzliche Vorschriften gestattet ist.
      </p>
      <p>
        <strong>Rechtsgrundlage:</strong> Soweit wir für Verarbeitungsvorgänge personenbezogener Daten eine Einwilligung einholen, dient Art. 6 Abs. 1 lit. a DSGVO als Rechtsgrundlage. Bei der Verarbeitung zur Erfüllung eines Vertrags dient Art. 6 Abs. 1 lit. b DSGVO als Rechtsgrundlage. Für die Verarbeitung zur Wahrung berechtigter Interessen dient Art. 6 Abs. 1 lit. f DSGVO als Rechtsgrundlage.
      </p>

      <h2>3. Hosting</h2>
      <p>
        Diese Website wird auf eigenen Servern betrieben. Es werden keine externen Hosting-Anbieter oder Content-Delivery-Networks (CDN) eingesetzt. Die Serverstandorte befinden sich in Deutschland.
      </p>
      <p>
        Beim Aufrufen unserer Website werden durch den auf Ihrem Endgerät zum Einsatz kommenden Browser automatisch Informationen an den Server unserer Website gesendet. Diese Informationen werden temporär in einem sog. Logfile gespeichert. Folgende Informationen werden dabei ohne Ihr Zutun erfasst und bis zur automatisierten Löschung gespeichert:
      </p>
      <ul>
        <li>IP-Adresse des anfragenden Rechners</li>
        <li>Datum und Uhrzeit des Zugriffs</li>
        <li>Name und URL der abgerufenen Datei</li>
        <li>Website, von der aus der Zugriff erfolgt (Referrer-URL)</li>
        <li>Verwendeter Browser und ggf. das Betriebssystem Ihres Rechners</li>
      </ul>
      <p>
        Die Verarbeitung erfolgt gemäß Art. 6 Abs. 1 lit. f DSGVO auf Basis unseres berechtigten Interesses an der Gewährleistung eines störungsfreien Betriebs unserer Website sowie zur Verbesserung unseres Angebotes.
      </p>

      <h2>4. Kontaktformular</h2>
      <p>
        Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns verarbeitet.
      </p>
      <p>
        Die Daten werden ausschließlich zur Beantwortung Ihrer Anfrage verwendet und nicht dauerhaft gespeichert. Die Übermittlung erfolgt verschlüsselt per SMTP an unsere E-Mail-Adresse. Nach Abschluss der Bearbeitung werden die Daten gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten bestehen.
      </p>
      <p>
        <strong>Rechtsgrundlage:</strong> Die Verarbeitung der Daten erfolgt auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Sie können diese Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitungsvorgänge bleibt vom Widerruf unberührt.
      </p>
      <p>
        <strong>Verarbeitete Daten:</strong> Name, E-Mail-Adresse, optional: Telefonnummer, gewählte Leistung, Nachrichtentext.
      </p>

      <h2>5. Cookies und Einwilligungsmanagement</h2>
      <p>
        Unsere Website verwendet Cookies sowie vergleichbare Technologien. Wir unterscheiden zwischen technisch notwendigen Cookies und Technologien zu Analyse- bzw. Reichweitenmessungs-Zwecken.
      </p>
      <p>
        <strong>Technisch notwendige Cookies:</strong> Diese sind erforderlich, um grundlegende Funktionen bereitzustellen (z. B. Speicherung Ihrer Cookie-Einwilligung und der gewählten Sprache). Rechtsgrundlage ist § 25 Abs. 2 Nr. 2 TDDDG in Verbindung mit Art. 6 Abs. 1 lit. f DSGVO. Eine Einwilligung ist hierfür nicht notwendig.
      </p>
      <p>
        <strong>Analyse- und Reichweitenmessung:</strong> Die unter Ziffer 6 beschriebene Reichweitenmessung erfolgt auf Grundlage Ihrer Einwilligung. Sie können über unseren Cookie-Banner entscheiden, ob Sie die Kategorie „Analyse" aktivieren möchten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO bzw., soweit Informationen auf Ihrem Endgerät gespeichert oder ausgelesen werden, § 25 Abs. 1 TDDDG.
      </p>
      <p>
        <strong>Widerruf Ihrer Einwilligung:</strong> Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen oder anpassen, indem Sie die Cookie-Einstellungen erneut aufrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung bleibt unberührt.
      </p>

      <h2>6. Reichweitenmessung (selbst gehostetes Rybbit)</h2>
      <p>
        Sofern Sie Ihre Einwilligung über unseren Cookie-Banner erteilt haben, setzen wir zur statistischen Auswertung der Nutzung unserer Website das Open-Source-Webanalyse-Tool <strong>Rybbit</strong> ein. Rybbit wird <strong>ausschließlich auf unseren eigenen Servern in Deutschland</strong> betrieben (self-hosted). Eine Übermittlung von Daten an den Softwarehersteller, an Dritte oder in Drittländer findet <strong>nicht</strong> statt.
      </p>
      <p>
        Die eingesetzte Reichweitenmessung arbeitet <strong>cookielos</strong>: Es werden keine Cookies gesetzt und keine Informationen auf Ihrem Endgerät gespeichert oder ausgelesen.
      </p>
      <p>Erfasst und ausgewertet werden ausschließlich folgende Informationen:</p>
      <ul>
        <li>Aufgerufene Seiten und Verweildauer</li>
        <li>Referrer-URL (verweisende Seite)</li>
        <li>Browsertyp und -version, Betriebssystem, Gerätetyp</li>
        <li>Ungefährer Standort auf Länder-/Regionsebene</li>
        <li>IP-Adresse (wird ausschließlich in anonymisierter Form verarbeitet und nicht dauerhaft gespeichert)</li>
        <li>Datum und Uhrzeit des Zugriffs</li>
      </ul>
      <p>
        <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO (Einwilligung). Weitere Informationen: <a href="https://www.rybbit.io" target="_blank" rel="noreferrer">rybbit.io</a>
      </p>

      <h2>7. Eingebundene Drittanbieter-Ressourcen</h2>
      <p>Mit Ausnahme des unter Ziffer 6 genannten Analyse-Dienstes binden wir keine weiteren Inhalte Dritter ein. Insbesondere:</p>
      <ul>
        <li><strong>Schriftarten</strong> werden über <code>next/font</code> lokal gehostet und nicht von Google-Servern nachgeladen</li>
        <li><strong>Keine Social-Media-Plugins</strong> (z. B. Facebook, Instagram, LinkedIn) eingebunden</li>
        <li><strong>Kein Meta Pixel, kein Google Ads Conversion-Tracking, kein Google Analytics</strong></li>
      </ul>

      <h2>8. Ihre Rechte</h2>
      <p>Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie betreffenden personenbezogenen Daten:</p>
      <ul>
        <li><strong>Recht auf Auskunft (Art. 15 DSGVO)</strong> – Sie haben das Recht, Auskunft über Ihre von uns verarbeiteten personenbezogenen Daten zu verlangen.</li>
        <li><strong>Recht auf Berichtigung (Art. 16 DSGVO)</strong> – Sie haben das Recht, die Berichtigung unrichtiger oder die Vervollständigung Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen.</li>
        <li><strong>Recht auf Löschung (Art. 17 DSGVO)</strong> – Sie haben das Recht, die Löschung Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen.</li>
        <li><strong>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</strong> – Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</li>
        <li><strong>Recht auf Widerspruch (Art. 21 DSGVO)</strong> – Sie haben das Recht, gegen die Verarbeitung Sie betreffender personenbezogener Daten Widerspruch einzulegen.</li>
        <li><strong>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</strong> – Sie haben das Recht, Ihre personenbezogenen Daten in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten.</li>
      </ul>
      <p>
        Zur Ausübung Ihrer Rechte können Sie sich jederzeit an uns wenden: <a href="mailto:kontakt@kasoria.com">kontakt@kasoria.com</a>
      </p>

      <h2>9. Beschwerderecht bei der Aufsichtsbehörde</h2>
      <p>
        Unbeschadet eines anderweitigen verwaltungsrechtlichen oder gerichtlichen Rechtsbehelfs steht Ihnen das Recht auf Beschwerde bei einer Aufsichtsbehörde zu, wenn Sie der Ansicht sind, dass die Verarbeitung der Sie betreffenden personenbezogenen Daten gegen die DSGVO verstößt.
      </p>
      <p>
        Die für uns zuständige Aufsichtsbehörde ist:<br />
        Die Landesbeauftragte für den Datenschutz Niedersachsen<br />
        Prinzenstraße 5, 30159 Hannover<br />
        Telefon: 0511 / 120 - 4500<br />
        E-Mail: <a href="mailto:poststelle@lfd.niedersachsen.de">poststelle@lfd.niedersachsen.de</a>
      </p>

      <hr />
      <p style={{ fontSize: "12px", color: "rgba(240,239,233,0.35)" }}>Stand: April 2026</p>
    </LegalPage>
  );
}
