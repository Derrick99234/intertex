import Image from "next/image";
import Link from "next/link";
import React from "react";

function Footer() {
  const productLinks = [
    {
      productName: "Men",
      productLink: "/shop/men",
    },
    {
      productName: "Women",
      productLink: "/shop/women",
    },
    {
      productName: "Kids",
      productLink: "/shop/kids",
    },
    {
      productName: "Accessories",
      productLink: "/shop/accessories",
    },
    {
      productName: "Our Factory",
      productLink: "/our-factory",
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
      resourceLink: "/security",
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
    <footer className="min-h-[50vh] bg-black text-white px-4 md:px-10 py-8">
      <div className="flex flex-col lg:flex-row lg:items-center gap-8">
        {/* Left Section - Newsletter & Company Info */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-white text-lg md:text-xl lg:text-2xl font-bold py-4 lg:py-8">
            Sign up to stay ahead in fashion! Get exclusive style tips, insights
            on fabrics and craftsmanship, the latest trends, and special
            discounts—delivered straight to your inbox.
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-2xl px-6 py-3 bg-white text-black outline-none"
            />
            <button className="border-white border-2 rounded-2xl bg-black text-white px-6 py-3 whitespace-nowrap hover:bg-white hover:text-black transition-colors">
              Subscribe Now
            </button>
          </div>
          <div className="mt-6">
            <h3 className="font-bold mb-2">Head Office Address:</h3>
            <p className="text-gray-300 text-sm">
              ONE SOURCE MART, Plot 12 Ligali Ayorinde Street, Victoria Island,
              Lagos.
            </p>
            <Image
              src={"/logo/intertex-logo.png"}
              alt="intertex logo"
              className="mt-4"
              width={150}
              height={200}
            />
          </div>
        </div>

        {/* Right Section - Links */}
        <div className="w-full lg:w-1/2 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
            {/* Products */}
            <div>
              <h3 className="text-lg font-bold mb-4">Products</h3>
              <ul className="space-y-2">
                {productLinks.map((link) => (
                  <li key={link.productName}>
                    <Link
                      href={link.productLink}
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {link.productName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-lg font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                {companyLinks.map((link) => (
                  <li key={link.companyName}>
                    <Link
                      href={link.companyLink}
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {link.companyName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-lg font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                {resourcesLinks.map((link) => (
                  <li key={link.resourceName}>
                    <Link
                      href={link.resourceLink}
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {link.resourceName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Follow Us */}
            <div>
              <h3 className="text-lg font-bold mb-4">Follow Us</h3>
              <ul className="space-y-2">
                {socialLinks.map((link) => (
                  <li key={link.socialName}>
                    <Link
                      href={link.socialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {link.socialName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
