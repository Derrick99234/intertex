import Image from "next/image";
import React from "react";
import { IoIosCamera } from "react-icons/io";
function PersonalInformatio() {
  return (
    <section className="min-h-screen bg-gray-100 p-4">
      <h3 className="text-lg font-semibold text-center mt-10">
        Personal Information
      </h3>
      <div className="relative mx-auto w-28 h-28">
        <Image
          src="/images/design1.jpeg"
          alt="Personal Information"
          width={500}
          height={300}
          className="w-28 h-28 rounded-full border-2 border-secondary mx-auto mt-10"
        />

        <IoIosCamera className="absolute bottom-0 right-0 mt-2 mr-2 p-1 text-white text-3xl bg-secondary rounded-full" />
      </div>
      <form className="max-w-2xl mx-auto mt-8 space-y-4">
        <div className="flex">
          <div className="w-1/2 pr-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              className="w-full p-2 outline-none border border-gray-300 rounded"
              placeholder="First Name"
            />
          </div>
          <div className="w-1/2 pl-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded outline-none"
              placeholder="Last Name"
            />
          </div>
        </div>
        <div className="flex">
          <div className="w-1/2 pr-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded outline-none"
              placeholder="Email"
            />
          </div>
          <div className="w-1/2 pl-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded outline-none"
              value="Super Admin"
              readOnly
            />
          </div>
        </div>
        <button className="w-full bg-secondary py-2 text-white text-lg mt-8">
          Save Changes
        </button>
      </form>
    </section>
  );
}

export default PersonalInformatio;
