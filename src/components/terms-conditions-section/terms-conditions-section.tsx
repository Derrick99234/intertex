import Image from "next/image";

const TermsConditionsSection = () => (
  <div className=" mx-auto py-8  md:px-8 px-4 text-[#222]">
    <p className="mb-4 font-bold">Effective Date: 05/29/2025</p>
    <p className="mb-8">
      Welcome to INTERTEX! These Terms & Conditions govern your use of our
      website, mobile app, and services. By accessing or purchasing from
      INTERTEX, you agree to comply with these terms.
    </p>
    <div className="space-y-8">
      <div>
        <h2 className="font-bold mb-2">1. General Use</h2>
        <p className="mb-4">
          You must be at least 18 years old or have parental/guardian consent to
          use our services.
        </p>
        <p className="mb-4">
          You agree to provide accurate and up-to-date information when creating
          an account or making a purchase.
        </p>
        <p className="mb-4">
          INTERTEX reserves the right to modify or discontinue any service
          without prior notice.
        </p>
      </div>
      <div>
        <h2 className="font-bold mb-2">2. Orders & Payments</h2>
        <p className="mb-4">
          All orders are subject to availability and confirmation.
        </p>
        <p className="mb-4">
          Prices displayed on our website are in [Insert Currency] and may be
          subject to taxes or shipping fees.
        </p>
        <p className="mb-4">
          We accept credit/debit cards, mobile payments, and other approved
          payment methods
        </p>
        <p className="mb-4">
          INTERTEX reserves the right to cancel fraudulent or suspicious orders.
        </p>
      </div>
      <div>
        <h2 className="font-bold mb-2">3. Shipping & Delivery</h2>
        <p className="mb-4">
          Delivery times vary based on location and selected shipping method.
        </p>
        <p className="mb-4">
          Customers are responsible for providing the correct shipping details.
          INTERTEX is not liable for lost packages due to incorrect addresses.
        </p>
        <p className="mb-4">
          International orders may be subject to customs fees or import duties.
        </p>
      </div>
      <div>
        <h2 className="font-bold mb-2">4. Returns & Exchanges</h2>
        <p className="mb-4">
          We offer a [Insert Timeframe] return policy for eligible items.
        </p>

        <p className="mb-4">
          Items must be unused, in original condition, and with tags attached to
          qualify for a return or exchange.
        </p>

        <p className="mb-4">
          Refunds are processed within [Insert Timeframe] after receiving the
          returned item.
        </p>
      </div>
      <div>
        <h2 className="font-bold mb-2">5. Intellectual Property</h2>
        <p className="mb-4">
          All content on our website, including images, logos, and designs, is
          the property of INTERTEX and may not be used without permission.
        </p>
      </div>
      <div>
        <h2 className="font-bold mb-2">6. User Conduct</h2>
        <div>
          <p className="mb-2">
            You agree not to use our website for unlawful or fraudulent
            activities.
          </p>
          <p className="mb-2">
            INTERTEX reserves the right to suspend or terminate accounts that
            violate our policies.
          </p>
        </div>
      </div>
      <div>
        <h2 className="font-bold mb-2">7. Limitation of Liability</h2>
        <div>
          <p className="mb-2">
            INTERTEX is not responsible for indirect, incidental, or
            consequential damages resulting from the use of our products or
            services.
          </p>
        </div>
      </div>
      <div>
        <h2 className="font-bold mb-2">8. Privacy & Security</h2>
        <div>
          <p className="mb-2">
            Your personal data is collected and processed in accordance with our
            Privacy Policy.
          </p>
          <p className="mb-2">
            We use industry-standard security measures to protect user
            information.
          </p>
        </div>
      </div>
      <div>
        <h2 className="font-bold mb-2">9. Changes to Terms</h2>
        <div>
          <p className="mb-2">
            INTERTEX may update these terms at any time. Changes will be posted
            on our website, and continued use of our services constitutes
            acceptance of the new terms.
          </p>
        </div>
      </div>
      <div>
        <h2 className="font-bold mb-2">10. Contact Us</h2>
        <div>
          <p className="mb-2">
            If you have any questions regarding these Terms & Conditions, please
            contact us at:
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
    <p className="mt-8 text-xs  text-[#222]">
      By using INTERTEX, you agree to these Terms & Conditions. Thank you for
      shopping with us!
    </p>
    <p className="mt-8 mb-8 text-xs  text-[#222]">
      #INTERTEX #ShopWithConfidence
    </p>
  </div>
);

export default TermsConditionsSection;
