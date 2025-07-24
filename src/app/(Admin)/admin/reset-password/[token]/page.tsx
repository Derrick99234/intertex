import ClientResetForm from "@/components/admin/otp-verification/client-reset-form";
import { Suspense } from "react";

export function generateStaticParams() {
  return [{ token: "first-post" }];
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientResetForm />;
    </Suspense>
  );
}
