import BlogPost from "@/components/blog/blog-post";

const BlogPostPage = ({ params }: any) => {
  return <BlogPost slug={params.slug} />;
};

export default BlogPostPage;
