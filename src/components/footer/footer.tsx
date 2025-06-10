import Image from "next/image";
import Link from "next/link";
import React from "react";

function Footer() {
  const productLinks = [
    {
      productName: "Men",
      productLink: "/mens-wear",
    },
    {
      productName: "Women",
      productLink: "/mens-wear",
    },
    {
      productName: "Kids",
      productLink: "mens-wear",
    },
    {
      productName: "Accessories",
      productLink: "mens-wear",
    },
    {
      productName: "Our Factory",
      productLink: "mens-wear",
    },
  ];
  const companyLinks = [
    {
      companyName: "About Us",
      companyLink: "/about",
    },
    {
      companyName: "Contact Us",
      companyLink: "/contact-us",
    },
    {
      companyName: "Wholesale",
      companyLink: "/wholesale-enquiries",
    },
    {
      companyName: "Uniform",
      companyLink: "/uniforms",
    },
    {
      companyName: "Become a Distributor",
      companyLink: "/distributor",
    },
    {
      companyName: "Customize Labels",
      companyLink: "/customize-labels",
    },
    {
      companyName: "Packaging",
      companyLink: "/packaging",
    },
    {
      companyName: "Become an Investor",
      companyLink: "/terms-of-service",
    },
  ];
  const resourcesLinks = [
    {
      resourceName: "FAQs",
      resourceLink: "/faqs",
    },
    {
      resourceName: "Blog",
      resourceLink: "/blog",
    },
    {
      resourceName: "Terms of Service",
      resourceLink: "/terms-of-service",
    },
    {
      resourceName: "Privacy Policy",
      resourceLink: "/privacy-policy",
    },
    {
      resourceName: "Quality Policy",
      resourceLink: "/quality-policy",
    },
    {
      resourceName: "Security",
      resourceLink: "/Security",
    },
  ];
  const socialLinks = [
    {
      socialName: "Facebook",
      socialLink: "https://www.facebook.com/yourcompany",
    },
    {
      socialName: "Instagram",
      socialLink: "https://www.instagram.com/yourcompany",
    },
    {
      socialName: "Twitter",
      socialLink: "https://www.twitter.com/yourcompany",
    },
    {
      socialName: "LinkedIn",
      socialLink: "https://www.linkedin.com/company/yourcompany",
    },
    {
      socialName: "YouTube",
      socialLink: "https://www.youtube.com/yourcompany",
    },
  ];
  return (
    <footer className="min-h-[50vh] bg-black text-white px-10 flex items-center">
      <div className="w-1/2">
        <h2 className="text-white text-2xl font-bold py-8">
          Sign up to stay ahead in fashion! Get exclusive style tips, insights
          on fabrics and craftsmanship, the latest trends, and special
          discounts—delivered straight to your inbox.
        </h2>
        <div className="flex gap-4">
          <input
            type="email"
            className="w-full rounded-2xl px-6 bg-white text-black outline-none"
          />
          <button className="border-white border-2 rounded-2xl bg-black text-white w-52 py-3">
            Subscribe Now
          </button>
        </div>
        <h3 className="font-bold mt-3">Head Office Address:</h3>
        <p>
          Your company Head Office address would be here surly if there is one
        </p>
        <Image
          src={"/logo/intertex_logo_2.png"}
          alt="intertex logo"
          className="mt-4"
          width={150}
          height={200}
        />
      </div>

      <div className="flex justify-between py-8 w-1/2 px-8">
        <div>
          <h3 className="text-lg font-bold">Products</h3>
          <ul className="mt-4">
            {productLinks.map((link) => (
              <li key={link.productName}>
                <Link
                  href={link.productLink}
                  className="text-white hover:text-gray-400"
                >
                  {link.productName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold">Company</h3>
          <ul className="mt-4">
            {companyLinks.map((link) => (
              <li key={link.companyName}>
                <Link
                  href={link.companyLink}
                  className="text-white hover:text-gray-400"
                >
                  {link.companyName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold">Resources</h3>
          <ul className="mt-4">
            {resourcesLinks.map((link) => (
              <li key={link.resourceName}>
                <Link
                  href={link.resourceLink}
                  className="text-white hover:text-gray-400"
                >
                  {link.resourceName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold">Follow Us</h3>
          <ul className="mt-4">
            {socialLinks.map((link) => (
              <li key={link.socialName}>
                <Link
                  href={link.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-400"
                >
                  {link.socialName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
