import Image from "next/image";

const PrivacyPolicySection = () => (
  <div className=" mx-auto py-12 px-4 text-[#222] ">
    <p className="mb-4 font-bold">Effective Date: 05/29/2025</p>
    <p className="mb-8">
      At INTERTEX, we value your privacy and are committed to protecting your
      personal information. This Privacy Policy explains how we collect, use,
      and safeguard your data when you interact with our website, mobile app,
      and services.
    </p>
    <div className="space-y-8">
      <div>
        <h2 className="font-bold mb-2">1. Information We Collect</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>
            <span className="font-semibold">Personal Information:</span> Name,
            email address, phone number, shipping address, billing details.
          </li>
          <li>
            <span className="font-semibold">Payment Information:</span>{" "}
            Credit/debit card details, mobile payment details, and transaction
            history.
          </li>
          <li>
            <span className="font-semibold">Account Information:</span> Login
            credentials, purchase history, and preferences.
          </li>
          <li>
            <span className="font-semibold">Technical Data:</span> IP address,
            device information, browsing activity, and cookies.
          </li>
        </ul>
      </div>
      <div>
        <h2 className="font-bold mb-2">2. How We Use Your Information</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>Process orders and deliver products.</li>
          <li>Provide customer support and respond to inquiries.</li>
          <li>Improve our website, app, and services.</li>
          <li>
            Send promotional offers, newsletters, and updates (with your
            consent).
          </li>
          <li>Detect and prevent fraud or security issues.</li>
        </ul>
      </div>
      <div>
        <h2 className="font-bold mb-2">3. Data Protection & Security</h2>
        <p>
          We implement strict security measures to protect your personal data
          from unauthorized access, alteration, or misuse. Your payment details
          are encrypted and processed securely.
        </p>
      </div>
      <div>
        <h2 className="font-bold mb-2">4. Sharing of Information</h2>
        <p className="mb-1">
          We do not sell or rent your personal data. However, we may share your
          information with:
        </p>
        <ul className="list-disc ml-6 space-y-1">
          <li>
            Trusted third-party service providers (e.g., payment processors,
            delivery partners).
          </li>
          <li>Legal authorities, if required by law.</li>
        </ul>
      </div>
      <div>
        <h2 className="font-bold mb-2">5. Your Rights & Choices</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>
            <span className="font-semibold">Access & Update:</span> You can
            update your personal information in your account settings.
          </li>
          <li>
            <span className="font-semibold">Opt-Out:</span> You can unsubscribe
            from marketing emails at any time.
          </li>
          <li>
            <span className="font-semibold">Data Deletion:</span> You may
            request the deletion of your account and data.
          </li>
        </ul>
      </div>
      <div>
        <h2 className="font-bold mb-2">6. Cookies & Tracking Technologies</h2>
        <p>
          We use cookies to enhance your browsing experience, analyze website
          traffic, and personalize content. You can manage cookie preferences in
          your browser settings.
        </p>
      </div>
      <div>
        <h2 className="font-bold mb-2">7. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy to reflect changes in our practices.
          Any updates will be posted on our website with the revised date.
        </p>
      </div>
      <div>
        <h2 className="font-bold mb-2">8. Contact Us</h2>
        <p className="mb-2">
          If you have any questions about this Privacy Policy, please contact us
          at:
        </p>
        <ul className="ml-2 space-y-2">
          <li className="flex items-center gap-2">
            <Image src="/icons/sms.png" alt="Email" width={18} height={18} />
            support@intertex.com
          </li>
          <li className="flex items-center gap-2">
            <Image src="/icons/call.png" alt="Phone" width={18} height={18} />
            +234-800-000-1234
          </li>
        </ul>
      </div>
    </div>
    <p className="mt-8 text-xs text-center text-[#222] mb-8">
      By using our services, you agree to the terms of this Privacy Policy.
      Thank you for trusting INTERTEX!
    </p>
  </div>
);

export default PrivacyPolicySection;
