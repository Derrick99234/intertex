import Shopping from "@/components/mens-wear/shopping";

export default function MensWearProductPage({ params }: any) {
  return <Shopping slug={params.slug} />;
}
