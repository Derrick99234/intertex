"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import InputField from "@/components/input-field/input-field";
import Google from "@/components/other-authentication-method/google";
import { LoadingSpinner } from "@/components/loading-spinner";
import { NotificationSystem } from "@/components/notification-popup";
import { API_BASE_URL } from "@/lib/constants";

type LoginResponse = {
  accessToken?: string;
  message?: string;
  error?: string;
  user?: unknown;
};

function getSafeReturnPath(value: string | null): string {
  if (!value) return "/";
  if (!value.startsWith("/")) return "/";
  if (value.startsWith("//")) return "/";
  return value;
}

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const returnTo = useMemo(
    () => getSafeReturnPath(searchParams.get("returnTo")),
    [searchParams],
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    const successMessage = searchParams.get("success");
    if (successMessage) {
      setNotification({ type: "success", message: successMessage });
    }
  }, [searchParams]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setNotification(null);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      let data: LoginResponse | null = null;
      try {
        data = (await response.json()) as LoginResponse;
      } catch {
        data = null;
      }

      if (!response.ok) {
        const message =
          data?.message ||
          data?.error ||
          "Unable to log in. Please check your credentials and try again.";
        setNotification({ type: "error", message });
        return;
      }

      const token = data?.accessToken;
      if (!token) {
        setNotification({
          type: "error",
          message:
            "Login succeeded, but the server did not return an access token.",
        });
        return;
      }

      if (typeof window !== "undefined") {
        window.localStorage.setItem("intertex-token", token);
      }

      setNotification({
        type: "success",
        message: "Login successful. Redirecting...",
      });
      router.replace(returnTo);
      router.refresh();
    } catch {
      setNotification({
        type: "error",
        message: "Something went wrong while logging in. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md items-center px-4 py-10">
      <div className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        {notification && (
          <NotificationSystem
            message={notification.message}
            type={notification.type}
          />
        )}

        <h1 className="mb-6 text-2xl font-semibold text-gray-900">Log in</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            required
          />
          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            required
          />

          <div className="text-right">
            <Link
              href="/reset-password"
              className="text-sm text-secondary hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center rounded-md bg-black px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <LoadingSpinner isLoading={isSubmitting} />
                <span>Logging in...</span>
              </span>
            ) : (
              "Log in"
            )}
          </button>
        </form>

        <div className="mt-6">
          <p className="text-sm text-center text-gray-500 mb-3">Or sign in with</p>
          <Google />
        </div>

        <p className="mt-6 text-sm text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-secondary hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
