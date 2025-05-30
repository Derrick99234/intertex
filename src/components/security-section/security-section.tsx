import Image from "next/image";

const SecuritySection = () => (
  <div className=" mx-auto py-8  md:px-8 px-4 text-[#222]">
    <p className="mb-4 font-bold">Effective Date: 05/29/2025</p>
    <p className="mb-8">
      At INTERTEX, we prioritize the security and privacy of our customers. We
      implement advanced security measures to protect your personal information,
      financial transactions, and account details from unauthorized access,
      fraud, and cyber threats.
    </p>
    <div className="space-y-8">
      <div>
        <h2 className="font-bold mb-2">1. Data Encryption & Protection</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>
            <span className="font-semibold">
              We use SSL (Secure Socket Layer) encryption to ensure that all
              sensitive data, including personal details and payment
              information, is securely transmitted and stored. Your information
              remains protected from breaches, leaks, and unauthorized access.{" "}
            </span>
          </li>
        </ul>
      </div>
      <div>
        <h2 className="font-bold mb-2">2. Secure Transactions</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>
            All online payments are processed through trusted and PCI-DSS
            compliant payment gateways, ensuring that your financial details
            remain confidential and protected from fraud. Additionally, we
            implement multi-factor authentication (MFA) for added security when
            accessing accounts.
          </li>
        </ul>
      </div>
      <div>
        <h2 className="font-bold mb-2">3. Fraud Prevention & Monitoring</h2>
        <p>
          We utilize real-time fraud detection systems to monitor suspicious
          activities and prevent unauthorized transactions. Our team actively
          investigates any security threats and takes immediate action to
          safeguard your account.
        </p>
      </div>
      <div>
        <h2 className="font-bold mb-2">4. User Account Protection</h2>
        <p className="mb-1">To enhance security, we encourage users to:</p>
        <ul className="list-disc ml-6 space-y-1">
          <li>Use strong and unique passwords for their accounts.</li>
          <li>Enable two-factor authentication (2FA) for extra protection.</li>
          <li>
            Regularly update their account information and monitor activity.
          </li>
        </ul>
      </div>
      <div>
        <h2 className="font-bold mb-2">5. Compliance & Security Audits</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>
            <span className="font-semibold">
              INTERTEX complies with global data security regulations and
              undergoes regular security audits to maintain the highest
              standards of protection. Our infrastructure is continually updated
              to defend against new cyber threats.{" "}
            </span>
          </li>
        </ul>
      </div>
      <div>
        <h2 className="font-bold mb-2">6. Reporting Security Issues</h2>
        <div>
          <p className="mb-2">
            If you have any questions about this Privacy Policy, please contact
            us at:
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
    </div>
    <p className="mt-8 text-xs text-center text-[#222]">
      By using INTERTEX services, you agree to our security practices, ensuring
      a safe and trusted shopping experience.
    </p>
    <p className="mt-8 mb-8 text-xs text-center text-[#222]">
      #StaySecure #INTERTEX #SafeShopping
    </p>
  </div>
);

export default SecuritySection;
