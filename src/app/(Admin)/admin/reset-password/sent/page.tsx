import ResetEmailSent from "@/components/reset-email-sent-content/reset-email-sent-content";
import { Suspense } from "react";

export default function ResetEmailSentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetEmailSent />
    </Suspense>
  );
}
