import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Legal Notice",
  robots: { index: false, follow: false },
};

export default function ImpressumEnPage() {
  return (
    <LegalPage lang="en" page="impressum">
      <h1>Legal Notice</h1>

      <h2>Details pursuant to § 5 DDG</h2>
      <p>
        Christian Wenterodt<br />
        Kasoria – Web Design<br />
        Birkenweg 9<br />
        21629 Neu Wulmstorf<br />
        Germany
      </p>

      <h2>Contact</h2>
      <p>
        Phone: <a href="tel:+4915168152133">+49 151 6815 2133</a><br />
        Email: <a href="mailto:kontakt@kasoria.com">kontakt@kasoria.com</a>
      </p>

      <h2>VAT Identification Number</h2>
      <p>
        VAT identification number pursuant to § 27 a of the German VAT Act:<br />
        DE342278449
      </p>

      <h2>Responsible for content pursuant to § 18 (2) MStV</h2>
      <p>
        Christian Wenterodt<br />
        Birkenweg 9<br />
        21629 Neu Wulmstorf<br />
        Germany
      </p>

      <hr />

      <h2>Liability for Content</h2>
      <p>
        As a service provider, we are responsible for our own content on these pages in accordance with § 7 (1) DDG and general law. However, pursuant to §§ 8 to 10 DDG, we are not obligated to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity.
      </p>
      <p>
        Obligations to remove or block the use of information in accordance with general law remain unaffected. Any liability in this regard is only possible from the point in time at which a concrete legal violation becomes known. Upon becoming aware of such violations, we will remove the relevant content immediately.
      </p>

      <h2>Liability for Links</h2>
      <p>
        Our website contains links to external third-party websites over whose content we have no influence. Therefore, we cannot assume any liability for these external contents. The respective provider or operator of the linked pages is always responsible for their content. The linked pages were checked for possible legal violations at the time of linking. Illegal content was not recognizable at the time of linking.
      </p>
      <p>
        Permanent monitoring of the content of linked pages is not reasonable without concrete evidence of a legal violation. Upon becoming aware of legal violations, we will remove such links immediately.
      </p>

      <h2>Copyright</h2>
      <p>
        The content and works created by the site operator on these pages are subject to German copyright law. Reproduction, editing, distribution, and any kind of use beyond the limits of copyright law require the written consent of the respective author or creator. Downloads and copies of this site are only permitted for private, non-commercial use.
      </p>
      <p>
        Insofar as content on this site was not created by the operator, the copyrights of third parties are respected. In particular, third-party content is marked as such. Should you nonetheless become aware of a copyright infringement, please notify us accordingly. Upon becoming aware of legal violations, we will remove such content immediately.
      </p>
    </LegalPage>
  );
}
