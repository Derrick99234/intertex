import { NextRequest, NextResponse } from "next/server";

const buildResetTargets = (baseUrl: string, token: string) => [
  {
    url: `${baseUrl}/admin/reset-password`,
    method: "POST",
    body: { token, newPassword: "" },
  },
  {
    url: `${baseUrl}/admin/reset-password/${token}`,
    method: "POST",
    body: { newPassword: "" },
  },
  {
    url: `${baseUrl}/admin/reset-password/${token}`,
    method: "PATCH",
    body: { newPassword: "" },
  },
];

export async function POST(request: NextRequest) {
  const { token, newPassword } = await request.json();
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!baseUrl) {
    return NextResponse.json(
      { message: "NEXT_PUBLIC_API_BASE_URL is not configured." },
      { status: 500 }
    );
  }

  if (!token || !newPassword) {
    return NextResponse.json(
      { message: "Token and new password are required." },
      { status: 400 }
    );
  }

  const attempts = buildResetTargets(baseUrl, token).map((target) => ({
    ...target,
    body: { ...target.body, newPassword },
  }));

  let lastErrorMessage = "Unable to reset password.";

  for (const attempt of attempts) {
    try {
      const response = await fetch(attempt.url, {
        method: attempt.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(attempt.body),
        cache: "no-store",
      });

      const text = await response.text();
      let payload: unknown = {};

      try {
        payload = text ? JSON.parse(text) : {};
      } catch {
        payload = { message: text };
      }

      if (response.ok) {
        return NextResponse.json(payload, { status: response.status });
      }

      lastErrorMessage =
        (payload as { message?: string })?.message || lastErrorMessage;

      if (response.status !== 404 && response.status !== 405) {
        return NextResponse.json(payload, { status: response.status });
      }
    } catch {
      lastErrorMessage = "Unable to reach the password reset service.";
    }
  }

  return NextResponse.json({ message: lastErrorMessage }, { status: 502 });
}
