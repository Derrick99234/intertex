"use client";
import { LoadingSpinner } from "@/components/loading-spinner";
import { NotificationSystem } from "@/components/notification-popup";
import { API_BASE_URL } from "@/lib/constants";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {
  const { data: session } = useSession();

  // if (session) {
  //   console.log("Session:", session);
  //   console.log("User:", session.user);
  //   console.log("ID Token:", (session as any).idToken); // send this to backend
  // }

  const router = useRouter();

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
  useEffect(() => {
    setIsLoading(true);
    const handleSubmit = async () => {
      if (session?.user) {
        const fullName = session?.user?.name || "";
        const email = session?.user?.email || "";
        const newPassword = Math.random().toString(36).slice(-8); // Generate a random password

        if (fullName === "" || email === "") {
          window.location.href = "/register";
        }
        const response = await fetch(`${API_BASE_URL}/platform-login/google`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: fullName,
            email: email,
            password: newPassword,
          }),
        });
        if (!response.ok) {
          const errorData = await response.json();
          showNotification(
            `Login failed: ${errorData.message || "Invalid credentials"}`,
            "error"
          );
          return;
        }
        showNotification("Login successful!", "success");
        const data = await response.json();
        if (data.accessToken) {
          localStorage.setItem("intertex-token", data.accessToken);
          await signOut({ redirect: false });
        }
        await new Promise((resolve) => setTimeout(resolve, 2000));
        showNotification("redirecting to profile page...", "info");
        router.push("/update-profile");
      }
    };
    handleSubmit();
  }, [session]);
  return (
    <div>
      {session?.user && <h1>Loading...</h1>}
      {notifications.status && (
        <NotificationSystem
          message={notifications.message}
          type={notifications.type as "success" | "error" | "info"}
        />
      )}
      <LoadingSpinner isLoading={isLoading} />
    </div>
  );
}
