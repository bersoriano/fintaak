import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Cookies - Fintaak",
  description: "Política de cookies de Fintaak. Conoce cómo usamos cookies y tecnologías similares en nuestro sitio web.",
};

export default function CookiePolicy() {
  return (
    <>
      <h1 style={{ fontFamily: 'var(--font-poppins)' }}>Cookie Policy</h1>
      <p className="text-sm text-gray-400 mb-8">Last updated August 23, 2025</p>

      <p>
        This Cookie Policy explains how Fintaak (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; and &quot;our&quot;) uses cookies and similar technologies to recognize you when you visit our website at <a href="https://fintaak.com">https://fintaak.com</a> (&quot;Website&quot;). It explains what these technologies are and why we use them, as well as your rights to control our use of them.
      </p>

      <h2>What Are Cookies?</h2>
      <p>Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.</p>
      <p>Cookies set by the website owner (in this case, Fintaak) are called &quot;first-party cookies.&quot; Cookies set by parties other than the website owner are called &quot;third-party cookies.&quot; Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics).</p>

      <h2>Why Do We Use Cookies?</h2>
      <p>We use first- and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as &quot;essential&quot; or &quot;strictly necessary&quot; cookies. Other cookies enable us to track and target the interests of our users to enhance the experience. Third parties serve cookies through our Website for advertising, analytics, and other purposes.</p>

      <h2>How Can I Control Cookies?</h2>
      <p>You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager. Essential cookies cannot be rejected as they are strictly necessary to provide you with services.</p>
      <p>If you choose to reject cookies, you may still use our Website though your access to some functionality and areas may be restricted. You may also set or amend your web browser controls to accept or refuse cookies.</p>

      <h2>Analytics and Customization Cookies</h2>
      <p>We use Google Analytics 4 to understand how visitors interact with our Website. Google Analytics may set cookies such as <code>_ga</code>, <code>_ga_*</code>, and related identifiers to collect information including pages visited, time spent on pages, device type, approximate geographic location, and referral source.</p>
      <p>This information helps us understand how users find our Website. The information collected is aggregated and does not directly identify you.</p>

      <h2>How Can I Control Cookies on My Browser?</h2>
      <p>As the means by which you can refuse cookies vary from browser to browser, you should visit your browser&apos;s help menu for more information. The following browsers provide cookie management:</p>
      <ul>
        <li>Chrome</li>
        <li>Internet Explorer</li>
        <li>Firefox</li>
        <li>Safari</li>
        <li>Edge</li>
        <li>Opera</li>
      </ul>
      <p>In addition, most advertising networks offer you a way to opt out of targeted advertising. For more information, visit:</p>
      <ul>
        <li>Digital Advertising Alliance</li>
        <li>Digital Advertising Alliance of Canada</li>
        <li>European Interactive Digital Advertising Alliance</li>
      </ul>

      <h2>What About Other Tracking Technologies?</h2>
      <p>We may use other similar technologies from time to time, like web beacons (sometimes called &quot;tracking pixels&quot; or &quot;clear gifs&quot;). These are tiny graphics files that contain a unique identifier that enables us to recognize when someone has visited our Website or opened an email including them.</p>

      <h2>Do You Serve Targeted Advertising?</h2>
      <p>Yes. We use Meta Pixel and related advertising technologies to measure the effectiveness of our advertising campaigns and to understand how users interact with our Website after clicking on social media advertisements.</p>
      <p>Meta may set cookies such as <code>_fbp</code> and related identifiers to collect information about your activity on our Website. This information may be used to:</p>
      <ul>
        <li>Measure advertising performance</li>
        <li>Build custom audiences</li>
        <li>Deliver targeted advertisements</li>
      </ul>
      <p>You can manage your advertising preferences through your Meta account settings and your browser settings.</p>

      <h2>How Often Will You Update This Cookie Policy?</h2>
      <p>We may update this Cookie Policy from time to time in order to reflect changes to the cookies we use or for other operational, legal, or regulatory reasons. Please revisit this Cookie Policy regularly to stay informed.</p>
      <p>The date at the top of this Cookie Policy indicates when it was last updated.</p>

      <h2>Where Can I Get Further Information?</h2>
      <p>If you have any questions about our use of cookies or tracking technologies, please contact us at: <a href="mailto:hello@fintaak.com">hello@fintaak.com</a></p>
    </>
  );
}
