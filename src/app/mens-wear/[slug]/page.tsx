import Shopping from "@/components/mens-wear/shopping";

export default function MensWearProductPage({ params }: { params: { slug: string } }) {
  return <Shopping slug={params.slug} />;
} 