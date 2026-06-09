import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  robots: { index: false, follow: false },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage lang="en" page="datenschutz">
      <h1>Privacy Policy</h1>

      <h2>1. Controller</h2>
      <p>
        The controller within the meaning of the General Data Protection Regulation (GDPR) and other national data protection laws is:
      </p>
      <p>
        Christian Wenterodt<br />
        Kasoria – Web Design<br />
        Birkenweg 9<br />
        21629 Neu Wulmstorf<br />
        Germany<br />
        Phone: +49 151 6815 2133<br />
        Email: <a href="mailto:kontakt@kasoria.com">kontakt@kasoria.com</a>
      </p>

      <h2>2. General Information on Data Processing</h2>
      <p>
        We process personal data of our users only to the extent necessary to provide a functional website and our content and services. Processing of personal data generally only takes place with the user&apos;s consent. An exception applies in cases where prior consent cannot be obtained for practical reasons and the processing of the data is permitted by law.
      </p>
      <p>
        <strong>Legal basis:</strong> Where we obtain consent for processing personal data, Art. 6(1)(a) GDPR serves as the legal basis. For processing necessary to perform a contract, Art. 6(1)(b) GDPR applies. For processing to protect legitimate interests, Art. 6(1)(f) GDPR applies.
      </p>

      <h2>3. Hosting</h2>
      <p>
        This website is operated on our own servers. No external hosting providers or content delivery networks (CDN) are used. The server locations are in Germany.
      </p>
      <p>
        When you visit our website, your browser automatically sends information to our server, which is temporarily stored in log files. The following information is collected without your active involvement and retained until automatic deletion:
      </p>
      <ul>
        <li>IP address of the requesting computer</li>
        <li>Date and time of access</li>
        <li>Name and URL of the retrieved file</li>
        <li>Website from which access was made (referrer URL)</li>
        <li>Browser used and, where applicable, operating system of your computer</li>
      </ul>
      <p>
        Processing is carried out pursuant to Art. 6(1)(f) GDPR on the basis of our legitimate interest in ensuring the smooth operation of our website and improving our services.
      </p>

      <h2>4. Contact Form</h2>
      <p>
        If you send us inquiries via the contact form, your details from the form, including the contact information you provided, will be processed for the purpose of handling your inquiry and in case of follow-up questions.
      </p>
      <p>
        The data is used exclusively to respond to your inquiry and is not stored permanently. Transmission takes place in encrypted form via SMTP to our email address. After processing is complete, the data will be deleted unless statutory retention obligations apply.
      </p>
      <p>
        <strong>Legal basis:</strong> Processing is carried out on the basis of your consent (Art. 6(1)(a) GDPR). You may withdraw your consent at any time. The lawfulness of processing carried out prior to withdrawal remains unaffected.
      </p>
      <p>
        <strong>Data processed:</strong> Name, email address, optionally: phone number, selected service, message text.
      </p>

      <h2>5. Cookies and Consent Management</h2>
      <p>
        Our website uses cookies and comparable technologies. We distinguish between technically necessary cookies and technologies used for analytics and audience measurement.
      </p>
      <p>
        <strong>Technically necessary cookies:</strong> These are required to provide basic functions (e.g. storing your cookie consent and selected language). The legal basis is § 25(2) No. 2 TDDDG in conjunction with Art. 6(1)(f) GDPR. No consent is required for these.
      </p>
      <p>
        <strong>Analytics and audience measurement:</strong> The audience measurement described in Section 6 is based on your consent. You can decide via our cookie banner whether to enable the &quot;Analytics&quot; category. The legal basis is Art. 6(1)(a) GDPR or, where information is stored on or accessed from your device, § 25(1) TDDDG.
      </p>
      <p>
        <strong>Withdrawing consent:</strong> You may withdraw or adjust your consent at any time with future effect by reopening the cookie settings. The lawfulness of processing prior to withdrawal remains unaffected.
      </p>

      <h2>6. Analytics (Self-Hosted Rybbit)</h2>
      <p>
        Where you have given your consent via our cookie banner, we use the open-source web analytics tool <strong>Rybbit</strong> for statistical evaluation of website usage. Rybbit is operated <strong>exclusively on our own servers in Germany</strong> (self-hosted). No data is transmitted to the software vendor, third parties, or third countries.
      </p>
      <p>
        The analytics tool operates <strong>without cookies</strong>: no cookies are set and no information is stored on or read from your device (no local storage, no session storage, no fingerprinting).
      </p>
      <p>Only the following information is collected and evaluated:</p>
      <ul>
        <li>Pages visited and time spent</li>
        <li>Referrer URL</li>
        <li>Browser type and version, operating system, device type</li>
        <li>Approximate location at country/region level</li>
        <li>IP address (processed in anonymized form only; not stored permanently)</li>
        <li>Date and time of access</li>
      </ul>
      <p>
        <strong>Legal basis:</strong> Art. 6(1)(a) GDPR (consent). Further information: <a href="https://www.rybbit.io" target="_blank" rel="noreferrer">rybbit.io</a>
      </p>

      <h2>7. Third-Party Resources</h2>
      <p>With the exception of the analytics service described in Section 6, we do not embed any third-party content. In particular:</p>
      <ul>
        <li><strong>Fonts</strong> are hosted locally via <code>next/font</code> and are not loaded from Google servers</li>
        <li><strong>No social media plugins</strong> (e.g. Facebook, Instagram, LinkedIn)</li>
        <li><strong>No Meta Pixel, no Google Ads conversion tracking, no Google Analytics</strong></li>
      </ul>

      <h2>8. Your Rights</h2>
      <p>You have the following rights regarding your personal data:</p>
      <ul>
        <li><strong>Right of access (Art. 15 GDPR)</strong> – You have the right to obtain information about your personal data processed by us.</li>
        <li><strong>Right to rectification (Art. 16 GDPR)</strong> – You have the right to request correction of inaccurate or completion of incomplete personal data.</li>
        <li><strong>Right to erasure (Art. 17 GDPR)</strong> – You have the right to request deletion of your personal data stored by us.</li>
        <li><strong>Right to restriction of processing (Art. 18 GDPR)</strong> – You have the right to request restriction of processing of your personal data.</li>
        <li><strong>Right to object (Art. 21 GDPR)</strong> – You have the right to object to the processing of your personal data.</li>
        <li><strong>Right to data portability (Art. 20 GDPR)</strong> – You have the right to receive your personal data in a structured, commonly used and machine-readable format.</li>
      </ul>
      <p>
        To exercise your rights, please contact us at: <a href="mailto:kontakt@kasoria.com">kontakt@kasoria.com</a>
      </p>

      <h2>9. Right to Lodge a Complaint</h2>
      <p>
        Without prejudice to any other administrative or judicial remedy, you have the right to lodge a complaint with a supervisory authority if you believe that the processing of your personal data infringes the GDPR.
      </p>
      <p>
        The supervisory authority responsible for us is:<br />
        Die Landesbeauftragte für den Datenschutz Niedersachsen<br />
        Prinzenstraße 5, 30159 Hannover, Germany<br />
        Phone: +49 511 120 4500<br />
        Email: <a href="mailto:poststelle@lfd.niedersachsen.de">poststelle@lfd.niedersachsen.de</a>
      </p>

      <hr />
      <p style={{ fontSize: "12px", color: "rgba(240,239,233,0.35)" }}>As of: April 2026</p>
    </LegalPage>
  );
}
