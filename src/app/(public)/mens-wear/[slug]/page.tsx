import Shopping from "@/components/mens-wear/shopping";
import { Suspense } from "react";

export function generateStaticParams() {
  return [{ slug: "first-post" }];
}

export default function MensWearProductPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Shopping />
    </Suspense>
  );
}
