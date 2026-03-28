import ClientResetForm from "@/components/admin/otp-verification/client-reset-form";
import { Suspense } from "react";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientResetForm />
    </Suspense>
  );
}
