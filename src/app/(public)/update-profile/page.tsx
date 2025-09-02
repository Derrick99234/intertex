"use client";
import InputField from "@/components/input-field/input-field";
import { LoadingSpinner } from "@/components/loading-spinner";
import { NotificationSystem } from "@/components/notification-popup";
import { API_BASE_URL } from "@/lib/constants";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";

function UpdateProfile() {
  const router = useRouter();
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    gender: "",
    dob: "",
    countryOfResidence: "",
    city: "",
    stateOfResidence: "",
    streetAddress: "",
    phone: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState({
    status: false,
    message: "",
    type: "info",
  });

  const showNotification = (
    message: string,
    type: "success" | "error" | "info"
  ) => {
    setNotifications({ message, type, status: true });

    setTimeout(() => {
      setNotifications((prev) => ({ ...prev, status: false }));
    }, 2000);
  };
  const [countries, setCountries] = useState<{ name: string; code: string }[]>(
    []
  );
  const [states, setStates] = useState<string[]>([]);

  const fetchState = async () => {
    setIsLoading(true);
    fetch("https://countriesnow.space/api/v0.1/countries/states", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country: user.countryOfResidence }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data && data.data.states) {
          setStates(data.data.states.map((s: any) => s.name));
        }
      })
      .catch((err) => console.error("Error fetching states:", err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    if (!hasMounted) {
      setHasMounted(true); // skip first render
      return;
    }
    if (user.countryOfResidence) {
      fetchState();
    }
  }, [user.countryOfResidence]);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("intertex-token");
      setIsLoading(true);

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await fetch(`${API_BASE_URL}/user/get-user`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        fetch("https://restcountries.com/v3.1/all?fields=name,cca2")
          .then((res) => res.json())
          .then((data) => {
            const formatted = data
              .map((c: any) => ({
                name: c.name.common,
                code: c.cca2,
              }))
              .sort((a: any, b: any) => a.name.localeCompare(b.name));

            setCountries(formatted);
          })
          .catch((err) => console.error("Error fetching countries:", err));

        console.log("Responses from fetch:", res);
        if (!res.ok) {
          localStorage.removeItem("intertex-token");
          showNotification("Failed to fetch user data", "error");
          router.push("/login");
          return;
        }

        const userData = await res.json();
        setUser({
          fullName: userData.fullName,
          email: userData.email,
          gender: userData.gender,
          dob: userData.dob || "",
          countryOfResidence: userData.countryOfResidence || "",
          stateOfResidence: userData.stateOfResidence || "",
          city: userData.city || "",
          streetAddress: userData.streetAddress || "",
          phone: userData.phone || "",
        });
        console.log("User data fetched successfully:", userData);
      } catch (err) {
        console.error("Token verification failed:", err);
        localStorage.removeItem("intertex-token");
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [router]);
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const updateUser = async () => {
      const res = await fetch(`${API_BASE_URL}/user/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("intertex-token")}`,
        },
        body: JSON.stringify(user),
      });

      if (!res.ok) {
        showNotification("Failed to update user data", "error");
        setIsLoading(false);
        return;
      }

      const updatedUser = await res.json();
      setUser(updatedUser);
      setIsLoading(false);
      showNotification("User data updated successfully", "success");
    };
    updateUser();
  };
  return (
    <section className="min-h-screen flex items-center justify-center bg-primary">
      <form
        className="max-w-md w-full mx-auto p-6 px-10 bg-white rounded-md shadow-md mt-10"
        onSubmit={handleSubmit}
      >
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
          value={user.dob || ""}
          onChange={onChange}
          required
        />
        <select
          name="gender"
          id="gender"
          className="w-full p-3 rounded-lg border border-gray-300 mb-4"
          onChange={onChange}
          value={user.gender || ""}
        >
          <option value="">-- choose gender --</option>
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
        <label htmlFor="countryOfResidence" className="block mb-2 font-medium">
          Select a Country
        </label>
        <select
          id="countryOfResidence"
          name="countryOfResidence"
          className="border rounded px-3 py-2 w-full"
          onChange={onChange}
          value={user.countryOfResidence || ""}
        >
          <option value="">-- Select a Country --</option>
          {countries.map((c) => (
            <option key={c.code} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
        <InputField
          label="Phone Number"
          placeholder="Enter your phone number"
          type="tel"
          id="phone"
          name="phone"
          value={user.phone || ""}
          onChange={onChange}
        />
        <div>
          <label htmlFor="stateOfResidence" className="block mb-2 font-medium">
            Select a State
          </label>
          <select
            id="stateOfResidence"
            name="stateOfResidence"
            className="border rounded px-3 py-2 w-full"
            onChange={onChange}
            value={user.stateOfResidence || ""}
          >
            <option value="">-- Select a State --</option>
            {states.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <InputField
          label="City"
          placeholder="Enter your city"
          type="text"
          id="city"
          name="city"
          value={user.city || ""}
          onChange={onChange}
        />
        <InputField
          label="Street Address"
          placeholder="Enter your street address"
          type="text"
          id="streetAddress"
          onChange={onChange}
          name="streetAddress"
          value={user.streetAddress || ""}
        />
        <button
          type="submit"
          className="mt-4 px-4 py-3 block w-52 mx-auto bg-secondary text-white rounded-md hover:bg-secondary/70 transition-colors duration-200"
        >
          Save
        </button>
      </form>
      {notifications.status && (
        <NotificationSystem
          message={notifications.message}
          type={notifications.type as "success" | "error" | "info"}
        />
      )}
      <LoadingSpinner isLoading={isLoading} />
    </section>
  );
}

export default UpdateProfile;
