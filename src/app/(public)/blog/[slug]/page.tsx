import BlogPost from "@/components/blog/blog-post";
import { Suspense, use } from "react";

// In your dynamic page
export function generateStaticParams() {
  return [{ slug: "first-post" }, { slug: "second-post" }];
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
