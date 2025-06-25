import InputField from "@/components/input-field/input-field";
import React from "react";

function UpdateProfile() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-primary">
      <form className="max-w-md w-full mx-auto p-6 px-10 bg-white rounded-md shadow-md mt-10">
        <h1 className="text-2xl font-bold mb-6 text-center">Update Profile</h1>
        <InputField
          label="First Name"
          placeholder="Enter your first name"
          id="firstName"
          name="firstName"
          required
        />
        <InputField
          label="Last Name"
          placeholder="Enter your last name"
          id="lastName"
          name="lastName"
          required
        />
        <InputField
          label="Date of Birth"
          placeholder="Enter your date of birth"
          type="date"
          id="dob"
          name="dob"
          required
        />
        <select
          name=""
          id=""
          className="w-full p-3 rounded-lg border border-gray-300 mb-4"
        >
          <option value="-- choose gender --">-- choose gender --</option>
          <option value="male">Male</option>
          <option value="female">female</option>
        </select>
        <InputField
          label="Email Address"
          placeholder="Enter your email address"
          type="email"
          id="email"
          name="email"
          required
        />
        <button
          type="submit"
          className="mt-4 px-4 py-3 block w-52 mx-auto bg-secondary text-white rounded-md hover:bg-secondary/70 transition-colors duration-200"
        >
          Save
        </button>
      </form>
    </section>
  );
}

export default UpdateProfile;
