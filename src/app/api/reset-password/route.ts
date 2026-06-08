import { NextRequest, NextResponse } from "next/server";

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

  try {
    const response = await fetch(`${baseUrl}/admin/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword }),
      cache: "no-store",
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch {
    return NextResponse.json(
      { message: "Unable to reach the password reset service." },
      { status: 502 }
    );
  }
}
