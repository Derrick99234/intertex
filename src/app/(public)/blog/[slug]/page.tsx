import BlogPost from "@/components/blog/blog-post";
import { Suspense, use } from "react";

export async function generateStaticParams() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/blog`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    const posts = data?.data ?? data?.blogs ?? data ?? [];
    return (Array.isArray(posts) ? posts : [])
      .filter((p: any) => p?.slug)
      .map((p: any) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

const BlogPostPage = ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = use(params).slug;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogPost slug={slug} />;
    </Suspense>
  );
};

export default BlogPostPage;
