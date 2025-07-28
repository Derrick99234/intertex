"use client";
import InputField from "@/components/input-field/input-field";
import { API_BASE_URL } from "@/lib/constants";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function UpdateProfile() {
  const router = useRouter();
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    id: "",
  });

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await fetch(`${API_BASE_URL}/user/get-user`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          localStorage.removeItem("token");
          router.push("/login");
          return;
        }

        const userData = await res.json();
        setUser({
          fullName: userData.fullName,
          email: userData.email,
          id: userData.id,
        });
      } catch (err) {
        console.error("Token verification failed:", err);
        localStorage.removeItem("accessToken");
        router.push("/login");
      }
    };

    verifyToken();
  }, [router]);
  return (
    <section className="min-h-screen flex items-center justify-center bg-primary">
      <form className="max-w-md w-full mx-auto p-6 px-10 bg-white rounded-md shadow-md mt-10">
        <h1 className="text-2xl font-bold mb-6 text-center">Update Profile</h1>
        <InputField
          label="Full Name"
          placeholder="Enter your full name"
          id="fullName"
          name="fullName"
          value={user.fullName || ""}
          readOnly={true}
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
          value={user.email || ""}
          readOnly={true}
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
