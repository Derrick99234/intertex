import BlogPost from "@/components/blog/blog-post";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

const BlogPostPage = ({ params }: BlogPostPageProps) => {
  return <BlogPost slug={params.slug} />;
};

export default BlogPostPage;
